import { TestBed } from '@angular/core/testing';

import { CfrMinSolverService } from './cfr-min-solver.service';

describe('CfrMinSolverService', () => {
  let service: CfrMinSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfrMinSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
