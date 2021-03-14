import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfrSolverComponent } from './cfr-solver.component';

describe('CfrSolverComponent', () => {
  let component: CfrSolverComponent;
  let fixture: ComponentFixture<CfrSolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfrSolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfrSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
