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
      delete this.error;
    } catch (e) {
      delete this.game;
      this.error = e;
    }
  }

  public loadKuhn(): void {
    console.log(JSON.stringify(kuhn, null, 2));
    this.setGame(kuhn);
  }

  public loadEvenOrOdd(): void {
    console.log(JSON.stringify(evenOrOdd, null, 2));
    // To create validation error, uncomment next line
    // evenOrOdd.states[0].player = 3;
    this.setGame(evenOrOdd);
  }

}
