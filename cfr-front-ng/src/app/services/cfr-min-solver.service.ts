import { Injectable } from '@angular/core';
import { JSONSchemaService } from './json-schema.service';
import gameSchema from '../../assets/games/json-schemas/2-player-zero-sum-sequential-game-spec.schema.json';

export interface GameStateActions {
  [key: string]: string;
}

export interface GameDecisionState extends GameStateBase {
  player: 1 | 2;
  knowledge: string;
  actions: GameStateActions[];
}

export interface GameChanceState extends GameStateBase {
  player: 'chance';
  actions: GameStateActions[];
}

export interface GameResultState extends GameStateBase {
  result: number;
}

export type GameStateBase = {
  name: string;
};

export type GameState = GameChanceState | GameDecisionState | GameResultState;

export type States = GameState[];

/**
 * A JSON format for defining 2-player zero-sum sequential game theory games.
 */
export interface ZeroSumSequentialGameTheorySpecification {
  name?: string;
  description?: string;
  start?: string;
  states?: States;
  error?: string;
}

export interface ActionStrategy {
  regret: number;
  prob: number;
  sum: number;
  reachProb: number;
  reachProbSum: number;
  solution: string;
}

export interface PlayerStrategy {
  [key: string]: ActionStrategy;
}

export interface PlayerStrategies {
  [key: string]: PlayerStrategy;
}

export interface GameStrategy {
  1: PlayerStrategies;
  2: PlayerStrategies;
}

export interface Solution {
  ev: string;
  strategy: GameStrategy;
}

@Injectable({
  providedIn: 'root'
})
export class CfrMinSolverService {

  constructor(
    public readonly jsonSchema: JSONSchemaService
  ) {}

  private static generateSolution(strategies: GameStrategy, ev: number, iterations: number): Solution {

    for (const player of [1, 2]) {
      for (const strategy of Object.values<PlayerStrategy>(strategies[player])) {
        // const size = Object.keys(strategy).length;
        for (const action of Object.values<ActionStrategy>(strategy)) {
          action.solution = ((action.sum / action.reachProbSum) * 100).toFixed(1) + '%';
        }
      }
    }

    console.log(JSON.stringify(strategies, null, 2));
    console.log((ev / iterations));

    return {
      ev: (ev / iterations).toFixed(3),
      strategy: strategies
    };
  }

  private static getState(game: ZeroSumSequentialGameTheorySpecification, stateName: string) {
    return game.states.find(state => {
      return state.name === stateName;
    });
  }

  private static initStrategies(game: ZeroSumSequentialGameTheorySpecification): GameStrategy {
    const strategies: GameStrategy = {
      1: {},
      2: {},
    };
    const startState = this.getState(game, game.start);
    const queue = [];
    queue.push(startState);

    while (queue.length >= 1) {
      const state = queue.shift();

      let playerState = false;

      // if this is a player state, we need a strategy for it
      if (state.player === 1 || state.player === 2) {
        playerState = true;
        if (strategies[state.player][state.knowledge] === undefined) {
          strategies[state.player][state.knowledge] = {};
        }
      }

      // handle the actions
      if (state.actions !== undefined) {
        for (const action of state.actions) {
          // actions only ever have 1 key/value
          const [key, value] = Object.entries<string>(action)[0];
          // push the next states onto the queue
          queue.push(this.getState(game, value));

          if (playerState) {
            if (strategies[state.player][state.knowledge][key] === undefined) {
              strategies[state.player][state.knowledge][key] = {
                regret: 0,
                prob: 0,
                sum: 0,
                reachProb: 0,
                reachProbSum: 0,
              };
            }
          }
        }
      }
    }

    // set probability for each strategy
    for (const player of [1, 2]) {
      for (const strategy of Object.values<PlayerStrategy>(strategies[player])) {
        const size = Object.keys(strategy).length;
        for (const action of Object.values<ActionStrategy>(strategy)) {
          action.prob = 1 / size;
        }
      }
    }

    return strategies;
  }

  private static runCfrMin(game: ZeroSumSequentialGameTheorySpecification): Solution {
    const iterations = 30000;
    const strategies = this.initStrategies(game);
    let ev = 0;
    for (let i = 0; i < iterations; i++) {
      ev += this.cfrMin(this.getState(game, game.start), game, strategies, [1, 1, 1]);
      this.updateStrategies(strategies);
    }

    return this.generateSolution(strategies, ev, iterations);
  }

  // update strategies proportional to the positive regret
  private static updateStrategies(strategies: GameStrategy): void {
    // set probability for each strategy
    for (const player of [1, 2]) {
      for (const strategy of Object.values<PlayerStrategy>(strategies[player])) {

        let regretTotal = 0;
        let numPosStrategies = 0;
        for (const action of Object.values<ActionStrategy>(strategy)) {
          regretTotal += action.regret > 0 ? action.regret : 0;
          numPosStrategies += action.regret >= 0 ? 1 : 0;
        }
        for (const action of Object.values<ActionStrategy>(strategy)) {
          // Update Average Strategy tracker
          action.sum += action.prob * action.reachProb;

          // pick actions in proportion to the amount of positive regret on the actions
          if (action.regret < 0) {
            action.prob = 0;
          } else {
            action.prob = regretTotal === 0 ? (1 / numPosStrategies) : (action.regret / regretTotal);
          }
          action.reachProbSum += action.reachProb;
          action.reachProb = 0;

        }
      }
    }
  }

  // current probs is player 1 reach prob, player 2 reach prob, chance reach prob
  private static cfrMin(state: GameState, game: ZeroSumSequentialGameTheorySpecification, strategies: GameStrategy,
                        currentProbs: [number, number, number]): number {
    // if terminal state
    if ('result' in state) {
      return state.result;
    }

    // if chance state
    else if ('player' in state && state.player === 'chance') {
      let ev = 0;
      const numActions = state.actions.length;
      for (const action of state.actions) {
        // actions only ever have 1 key/value
        const nextState = Object.values<string>(action)[0];
        const newProbs = JSON.parse(JSON.stringify(currentProbs));
        newProbs[2] /= numActions;
        ev += this.cfrMin(this.getState(game, nextState), game, strategies, newProbs);
      }
      // return expected value of the sum of chance states divided by the number of chance states
      return ev / numActions;
    }

    // else it's a player decision state
    else {
      const player = state.player;
      const knowledge = state.knowledge;
      const strategy = strategies[player][knowledge];

      const actionEvs = [];
      let utility = 0;
      for (const action of state.actions) {
        // actions only ever have 1 key/value
        const [actionName, nextState] = Object.entries<string>(action)[0];
        const actionStrategy = strategy[actionName];
        actionStrategy.reachProb += currentProbs[player - 1];
        const newProbs = JSON.parse(JSON.stringify(currentProbs));
        newProbs[player - 1] *= actionStrategy.prob;
        let actionEv = this.cfrMin(this.getState(game, nextState), game, strategies, newProbs);
        // need to invert values for player 2
        if (player === 2) {
          actionEv *= -1;
        }
        actionEvs.push(actionEv);
        utility += (actionEv * actionStrategy.prob);
      }
      for (let i = 0; i < state.actions.length; i++) {
        // actions only ever have 1 key/value
        const actionName = Object.keys(state.actions[i])[0];
        const actionStrategy = strategy[actionName];
        const regret = actionEvs[i] - utility;
        const altPlayer = player === 1 ? 2 : 1;
        actionStrategy.regret += (regret * currentProbs[altPlayer - 1] * currentProbs[2] );
      }
      // revert that values previously inverted
      return player === 2 ? -1 * utility : utility;
    }
  }

  public validateGame(game: object): ZeroSumSequentialGameTheorySpecification {
    const result = this.jsonSchema.validate(gameSchema, game);
    if (result.isValid) {
      console.log('valid');
      return game as ZeroSumSequentialGameTheorySpecification;
    } else {
      console.log(result.errorsText);
      return {
        error: result.errorsText
      };
    }
  }

  public async solveGame(game: ZeroSumSequentialGameTheorySpecification): Promise<Solution> {

    return new Promise((resolve) => {
      setTimeout(() => {
        const solution = CfrMinSolverService.runCfrMin(game);
        resolve(solution);
      }, 0);
    });

  }




}
