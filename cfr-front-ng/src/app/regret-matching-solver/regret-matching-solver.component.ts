import { Component, OnInit } from '@angular/core';
import { RegretMatchingSolverService, Game, Players } from '../regret-matching-solver.service';

@Component({
  selector: 'app-regret-matching-solver',
  templateUrl: './regret-matching-solver.component.html',
  styleUrls: ['./regret-matching-solver.component.scss']
})
export class RegretMatchingSolverComponent implements OnInit {

  public game1: Game = [[[1, 1], [0, 10]],
                      [[10, 0], [5, 5]]];

  public players1: Players = [
    {
      name: 'Player 1',
      strategies: [{name: 'Say Nothing'}, {name: 'Snitch'}]
    },
    {
      name: 'Player 2',
      strategies: [{name: 'Say Nothing'}, {name: 'Snitch'}]
    }
  ];

  public game2: Game = [[[0, 0], [0, 1], [1, 0]],
                        [[1, 0], [0, 0], [0, 1]],
                        [[0, 1], [1, 0], [0, 0]]];

  public players2: Players = [
    {
      name: 'Player 1',
      strategies: [{name: 'Rock'}, {name: 'Paper'}, {name: 'Scissors'}]
    },
    {
      name: 'Player 2',
      strategies: [{name: 'Rock'}, {name: 'Paper'}, {name: 'Scissors'}]
    }
  ];

  constructor(
    public readonly regretMatchingService: RegretMatchingSolverService
  ) { }

  ngOnInit(): void {
    this.solveGame();
  }

  public solveGame(): any {
    this.regretMatchingService.solveGame(this.game1, this.players1);
    this.regretMatchingService.solveGame(this.game2, this.players2);
  }

}
