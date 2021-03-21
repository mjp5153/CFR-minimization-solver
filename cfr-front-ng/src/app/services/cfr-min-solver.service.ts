import { Injectable } from '@angular/core';
import { JSONSchemaService } from './json-schema.service';
import gameSchema from '../../assets/games/json-schemas/2-player-zero-sum-sequential-game-spec.schema.json';


export interface GameStateActions {
  [key: string]: string;
}

export interface GameDecisionState extends GameState {
  player: [1, 2];
  knowledge: string;
  actions: GameStateActions[];
}

export interface GameChanceState extends GameState {
  player: ['chance'];
  actions: GameStateActions[];
}

export interface GameResultState extends GameState {
  result: number;
}

export type GameState = {
  name: string;
};

export type States = GameState[];

/**
 * A JSON format for defining 2-player zero-sum sequential game theory games.
 */
export interface ZeroSumSequentialGameTheorySpecification {
  name?: string;
  description?: string;
  start?: string;
  states?: States;
}

@Injectable({
  providedIn: 'root'
})
export class CfrMinSolverService {

  constructor(
    public readonly jsonSchema: JSONSchemaService
  ) {}

  public validateGame(game: object): ZeroSumSequentialGameTheorySpecification {
    const result = this.jsonSchema.validate(gameSchema, game);
    if (result.isValid) {
      console.log('valid');
      return game as ZeroSumSequentialGameTheorySpecification;
    } else {
      console.log(result.errorsText);
      return null;
    }
  }


}
