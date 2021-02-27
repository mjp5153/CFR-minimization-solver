import { Injectable } from '@angular/core';


export type Game = [number, number][][];

export type Strategy = {
  name: string;
  sum?: number;
  regret?: number;
  percentage?: number;
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

  /**
   * Play a game.
   * @param game The game matrix
   * @param players The players, with their moves
   */
  public solveGame(game: Game, players: Players): any {

    const iterations = 10000;
    this.initStrategies(players);
    for (let i = 0; i < iterations; i++) {
      this.regretMatching(game, players);
    }
    this.printStrategy(players, iterations);
    return 0;
  }

  private printStrategy(players: Players, iterations: number): void {
    for (const player of players) {
      console.log(player.name + ':');
      for (const strategy of player.strategies) {
        console.log('   ' + strategy.name + ': ' + (strategy.sum / iterations));
      }
    }
  }


  private initStrategies(players: Players): void {
    for (const player of players) {
      // const numStrategies = player.strategies.length;
      for (const strategy of player.strategies) {
        strategy.sum = 0;
        strategy.regret = 0;
      }
    }
  }


  private regretMatching(game: Game, players: Players): void {

    // loop over players
    for (const player of players) {
      // Set current strategy based on regrets
      let regretTotal = 0;
      const numStrategies = player.strategies.length;
      for (const strategy of player.strategies) {
        regretTotal += strategy.regret > 0 ? strategy.regret : 0;
      }
      for (const strategy of player.strategies) {
        strategy.percentage = regretTotal === 0 ? (1 / numStrategies) : (strategy.regret / regretTotal);

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
          for (const row of game) {
            strategyEV += row[j][i] * strategy.percentage;
          }
        } else if (i === 1) {
          // Player 2
          for (const cell of game[j]) {
            strategyEV += cell[i] * strategy.percentage;
          }
        }
        // Update regret for each action
        strategy.regret += strategyEV - gameEv;
      }
    }

    // At the end of this algorithm, the regrets and sums have been updated for each player's strategies
  }
}
