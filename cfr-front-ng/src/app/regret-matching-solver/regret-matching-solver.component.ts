import { Component, OnInit } from '@angular/core';
import { RegretMatchingSolverService, Game, Players, Solution } from '../regret-matching-solver.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUtilityDialogComponent } from '../update-utility-dialog/update-utility-dialog.component';
import { UpdateNameDialogComponent } from '../update-name-dialog/update-name-dialog.component';

@Component({
  selector: 'app-regret-matching-solver',
  templateUrl: './regret-matching-solver.component.html',
  styleUrls: ['./regret-matching-solver.component.scss']
})
export class RegretMatchingSolverComponent implements OnInit {

  public year;

  public game: Game = [[[0, 0], [0, 0]],
                       [[0, 0], [0, 0]]];

  public players: Players = [{
      name: 'Player 1',
      strategies: [{name: 'Action 1'}, {name: 'Action 2'}]
    },
    {
      name: 'Player 2',
      strategies: [{name: 'Action 1'}, {name: 'Action 2'}]
    }
  ];

  public defaultGame: Game = [[[0, 0], [0, 0]],
    [[0, 0], [0, 0]]];

  public defaultPlayers: Players = [{
    name: 'Player 1',
    strategies: [{name: 'Action 1'}, {name: 'Action 2'}]
  },
    {
      name: 'Player 2',
      strategies: [{name: 'Action 1'}, {name: 'Action 2'}]
    }
  ];

  public prisoners: Game = [[[-1, -1], [-10, 0]],
                            [[0, -10], [-5, -5]]];

  public prisonersPlayers: Players = [
    {
      name: 'Prisoner 1',
      strategies: [{name: 'Say Nothing'}, {name: 'Snitch'}]
    },
    {
      name: 'Prisoner 2',
      strategies: [{name: 'Say Nothing'}, {name: 'Snitch'}]
    }
  ];

  public rockPaperScissors: Game = [[[0, 0], [0, 1], [1, 0]],
                                    [[1, 0], [0, 0], [0, 1]],
                                    [[0, 1], [1, 0], [0, 0]]];

  public rpsPlayers: Players = [
    {
      name: 'Player 1',
      strategies: [{name: 'Rock'}, {name: 'Paper'}, {name: 'Scissors'}]
    },
    {
      name: 'Player 2',
      strategies: [{name: 'Rock'}, {name: 'Paper'}, {name: 'Scissors'}]
    }
  ];

  public solution: Solution = null;

  constructor(
    private readonly dialog: MatDialog,
    public readonly regretMatchingService: RegretMatchingSolverService,
  ) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  public solveGame(): any {
    const game = JSON.parse(JSON.stringify(this.game));
    const players = JSON.parse(JSON.stringify(this.players));
    this.solution = this.regretMatchingService.solveGame(game, players);
  }

  public addPlayer1Action(): void {
    const len = this.players[0].strategies.length + 1;
    this.players[0].strategies.push({name: `Action ${len}`});
    const newRow = [];
    for (const i of this.game[0]) {
      newRow.push([0, 0]);
    }
    this.game.push(newRow);
    delete this.solution;
  }

  public addPlayer2Action(): void {
    const len = this.players[1].strategies.length + 1;
    this.players[1].strategies.push({name: `Action ${len}`});
    for (const row of this.game) {
      row.push([0, 0]);
    }
    delete this.solution;
  }

  public loadPrisoner(): void {
    this.game = JSON.parse(JSON.stringify(this.prisoners));
    this.players = JSON.parse(JSON.stringify(this.prisonersPlayers));
    delete this.solution;
  }

  public loadRPS(): void {
    this.game = JSON.parse(JSON.stringify(this.rockPaperScissors));
    this.players = JSON.parse(JSON.stringify(this.rpsPlayers));
    delete this.solution;
  }

  public resetGame(): void {
    this.game = JSON.parse(JSON.stringify(this.defaultGame));
    this.players = JSON.parse(JSON.stringify(this.defaultPlayers));
    delete this.solution;
  }

  public async updateCellValue(i: number, j: number): Promise<void> {
    console.log(i + ',' + j);
    const dialogRef = this.dialog.open(UpdateUtilityDialogComponent, {
      data: {
        player1Name: this.players[0].name,
        player2Name: this.players[1].name,
        player1Utility: this.game[i][j][0],
        player2Utility: this.game[i][j][1],
      },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.game[i][j] = [result.player1Utility, result.player2Utility];
    }
  }

  public async updatePlayerName(i: number): Promise<void> {
    console.log(i);
    const dialogRef = this.dialog.open(UpdateNameDialogComponent, {
      data: {
        type: 'Player',
        name: this.players[i].name,
      },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.players[i].name = result.name;
    }
  }

  public async updateActionName(playerIndex: number, strategyIndex: number): Promise<void> {
    console.log(playerIndex + ', ' + strategyIndex);
    const dialogRef = this.dialog.open(UpdateNameDialogComponent, {
      data: {
        type: 'Action',
        name: this.players[playerIndex].strategies[strategyIndex].name,
      },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.players[playerIndex].strategies[strategyIndex].name = result.name;
    }
  }

}
