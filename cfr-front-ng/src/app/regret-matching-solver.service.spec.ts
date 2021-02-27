import { TestBed } from '@angular/core/testing';

import { RegretMatchingSolverService } from './regret-matching-solver.service';

describe('RegretMatchingSolverService', () => {
  let service: RegretMatchingSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegretMatchingSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
