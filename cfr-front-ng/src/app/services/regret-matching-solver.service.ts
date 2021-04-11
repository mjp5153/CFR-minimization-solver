import { Injectable } from '@angular/core';


export type Game = [number, number][][];

export type Strategy = {
  name: string;
  sum?: number;
  regret?: number;
  percentage?: number;
};

export type Solution = PlayerSolution[];

export type PlayerSolution = {
  name: string;
  strategies: StrategySolution[];
};

export type StrategySolution = {
  action: string;
  percentage: number;
};

export type Player = {
  name: string;
  strategies: Strategy[];
};

export type Players = [Player, Player];


@Injectable({
  providedIn: 'root'
})
export class RegretMatchingSolverService {

  constructor() { }

  private static generateSolution(players: Players, iterations: number): Solution {
    const retVal: Solution = [];
    for (const player of players) {
      console.log(player.name + ':');
      const playerObj = {
        name: player.name,
        strategies: [],
      };
      for (const strategy of player.strategies) {
        console.log('   ' + strategy.name + ': ' + (strategy.sum / iterations));
        playerObj.strategies.push({
          action: strategy.name,
          percentage: ((strategy.sum / iterations) * 100).toFixed(1) + '%',
        });
      }
      retVal.push(playerObj);
    }
    return retVal;
  }

  private static makeStrategyPositive(game: Game): void {
    let min = 0;
    for (const row of game) {
      for (const cell of row) {
        if (cell[0] < 0 && cell[0] < min) {
          min = cell[0];
        }
        if (cell[1] < 0 && cell[1] < min) {
          min = cell[1];
        }
      }
    }
    if (min < 0) {
      for (const row of game) {
        for (const cell of row) {
          cell[0] = cell[0] - min;
          cell[1] = cell[1] - min;
        }
      }
    }
  }


  private static initStrategies(players: Players): void {
    for (const player of players) {
      // const numStrategies = player.strategies.length;
      for (const strategy of player.strategies) {
        strategy.sum = 0;
        strategy.regret = 0;
      }
    }
  }


  private static regretMatching(game: Game, players: Players): void {

    // loop over players
    for (const player of players) {
      // Set current strategy based on regrets
      let regretTotal = 0;
      let numPosStrategies = 0;
      for (const strategy of player.strategies) {
        regretTotal += strategy.regret > 0 ? strategy.regret : 0;
        numPosStrategies += strategy.regret >= 0 ? 1 : 0;
      }
      for (const strategy of player.strategies) {
        // pick actions in proportion to the amount of positive regret on the actions
        if (strategy.regret < 0) {
          strategy.percentage = 0;
        } else {
          strategy.percentage = regretTotal === 0 ? (1 / numPosStrategies) : (strategy.regret / regretTotal);
        }

        // Update Average Strategy tracker
        strategy.sum += strategy.percentage;
      }
    }

    // loop over players
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      // Calculate total Expected Value
      let gameEv = 0;
      for (let j = 0; j < game.length; j++) {
        for (let k = 0; k < game[j].length; k++) {
          gameEv += game[j][k][i] * players[0].strategies[j].percentage * players[1].strategies[k].percentage;
        }
      }


      // Calculate expected value for each action
      for (let j = 0; j < player.strategies.length; j++) {
        const strategy = player.strategies[j];

        let strategyEV = 0;
        if (i === 0) {
          // Player 1
          for (let k = 0; k < game[j].length; k++) {
            const cell = game[j][k];
            strategyEV += cell[i] * players[1].strategies[k].percentage;
          }
        } else if (i === 1) {
          // Player 2
          for (let k = 0; k < game.length; k++) {
            strategyEV += game[k][j][i] * players[0].strategies[k].percentage;
          }
        }
        // Update regret for each action
        strategy.regret += strategyEV - gameEv;
      }
    }

    // At the end of this algorithm, the regrets and sums have been updated for each player's strategies
  }

  /**
   * Play a game.
   * @param game The game matrix
   * @param players The players, with their moves
   */
  public solveGame(game: Game, players: Players): Solution {

    RegretMatchingSolverService.makeStrategyPositive(game);
    const iterations = 10000;
    RegretMatchingSolverService.initStrategies(players);
    for (let i = 0; i < iterations; i++) {
      RegretMatchingSolverService.regretMatching(game, players);
    }
    return RegretMatchingSolverService.generateSolution(players, iterations);
  }
}
