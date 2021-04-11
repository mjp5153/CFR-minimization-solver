import { Component, OnInit } from '@angular/core';
import kuhn from '../../assets/games/examples/kuhn.json';
import evenOrOdd from '../../assets/games/examples/even-or-odd.json';
import {
  CfrMinSolverService, Solution,
  ZeroSumSequentialGameTheorySpecification
} from '../services/cfr-min-solver.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadGameDialogComponent } from '../upload-game-dialog/upload-game-dialog.component';


@Component({
  selector: 'app-cfr-solver',
  templateUrl: './cfr-solver.component.html',
  styleUrls: ['./cfr-solver.component.scss']
})
export class CfrSolverComponent implements OnInit {

  public game: ZeroSumSequentialGameTheorySpecification;
  public result: Solution;
  public error: string;
  public loading = false;

  constructor(
    public readonly cfrService: CfrMinSolverService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public async setGame(game: object): Promise<void> {
    try {
      this.loading = true;
      delete this.result;
      game = this.cfrService.validateGame(game);
      this.game = JSON.parse(JSON.stringify(game));
      if (this.game.error) {
        this.error = this.game.error;
        delete this.game;
      } else {
        delete this.error;

        this.result = await this.cfrService.solveGame(game);
        // this.result = this.formatResult(resultObject);
      }
    } catch (e) {
      delete this.game;
      delete this.result;
      this.error = e;
    } finally {
      this.loading = false;
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

  public resetGame(): void {
    this.loading = false;
    delete this.error;
    delete this.game;
    delete this.result;
  }

  public async uploadGame(): Promise<void> {
    const dialogRef = this.dialog.open(UploadGameDialogComponent);

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const jsonResult = JSON.parse(result);
      this.setGame(jsonResult);
    }
  }

  public formatResult(obj: Solution) {
    let str = '';
    str += 'Player 1 expected value: ' + obj.ev + '\n';
    str += 'Player 2 expected value: -' + obj.ev + '\n';

    return str;
  }

}
