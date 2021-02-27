import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfrMinimizationSolverComponent } from './cfr-minimization-solver.component';

describe('CfrMinimizationSolverComponent', () => {
  let component: CfrMinimizationSolverComponent;
  let fixture: ComponentFixture<CfrMinimizationSolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfrMinimizationSolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfrMinimizationSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
