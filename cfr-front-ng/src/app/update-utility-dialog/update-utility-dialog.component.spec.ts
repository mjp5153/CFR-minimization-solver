import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUtilityDialogComponent } from './update-utility-dialog.component';

describe('UpdateUtilityDialogComponent', () => {
  let component: UpdateUtilityDialogComponent;
  let fixture: ComponentFixture<UpdateUtilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUtilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUtilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
