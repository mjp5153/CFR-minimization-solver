import { Component, OnInit } from '@angular/core';
import { CfrMinimizationSolverService } from '../cfr-minimization-solver.service';

@Component({
  selector: 'app-cfr-minimization-solver',
  templateUrl: './cfr-minimization-solver.component.html',
  styleUrls: ['./cfr-minimization-solver.component.scss']
})
export class CfrMinimizationSolverComponent implements OnInit {

  constructor(
    public readonly cfrService: CfrMinimizationSolverService
  ) { }

  ngOnInit(): void {
  }

}
