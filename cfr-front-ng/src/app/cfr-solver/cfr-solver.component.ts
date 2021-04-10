import { Component, OnInit } from '@angular/core';
import kuhn from '../../assets/games/examples/kuhn.json';
import evenOrOdd from '../../assets/games/examples/even-or-odd.json';
import {
  CfrMinSolverService,
  ZeroSumSequentialGameTheorySpecification
} from '../services/cfr-min-solver.service';


@Component({
  selector: 'app-cfr-solver',
  templateUrl: './cfr-solver.component.html',
  styleUrls: ['./cfr-solver.component.scss']
})
export class CfrSolverComponent implements OnInit {

  public game: ZeroSumSequentialGameTheorySpecification;
  public result: string;
  public error: string;

  constructor(
    public readonly cfrService: CfrMinSolverService
  ) { }

  ngOnInit(): void {
  }

  public setGame(game: object): void {
    try {
      game = this.cfrService.validateGame(game);
      this.game = JSON.parse(JSON.stringify(game));
      if (this.game.error) {
        this.error = this.game.error;
        delete this.game;
      } else {
        delete this.error;
        // TODO: Play that sucka
        this.result = this.cfrService.solveGame(game);
      }
    } catch (e) {
      delete this.game;
      this.error = e;
    }
  }

  public loadKuhn(): void {
    this.setGame(kuhn);
  }

  public loadEvenOrOdd(): void {
    // To create validation error, uncomment next line
    // evenOrOdd.states[0].player = 3;
    this.setGame(evenOrOdd);
  }

}
