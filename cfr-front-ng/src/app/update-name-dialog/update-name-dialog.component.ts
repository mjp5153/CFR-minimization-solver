import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface NameDialogData {
  type: string;
  name: string;
}

@Component({
  selector: 'app-update-name-dialog',
  templateUrl: './update-name-dialog.component.html',
  styleUrls: ['./update-name-dialog.component.scss']
})
export class UpdateNameDialogComponent implements OnInit {

  constructor(
    public readonly dialogRef: MatDialogRef<UpdateNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: NameDialogData
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFinish(): void {
    this.dialogRef.close(this.data);
  }

}
