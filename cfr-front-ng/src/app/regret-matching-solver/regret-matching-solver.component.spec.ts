import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegretMatchingSolverComponent } from './regret-matching-solver.component';

describe('RegretMatchingSolverComponent', () => {
  let component: RegretMatchingSolverComponent;
  let fixture: ComponentFixture<RegretMatchingSolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegretMatchingSolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegretMatchingSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
