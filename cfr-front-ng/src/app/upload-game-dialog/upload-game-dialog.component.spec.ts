import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGameDialogComponent } from './upload-game-dialog.component';

describe('UploadGameDialogComponent', () => {
  let component: UploadGameDialogComponent;
  let fixture: ComponentFixture<UploadGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
