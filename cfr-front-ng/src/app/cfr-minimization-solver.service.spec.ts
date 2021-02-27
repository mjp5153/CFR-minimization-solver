import { TestBed } from '@angular/core/testing';

import { CfrMinimizationSolverService } from './cfr-minimization-solver.service';

describe('CfrMinimizationSolverService', () => {
  let service: CfrMinimizationSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfrMinimizationSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
