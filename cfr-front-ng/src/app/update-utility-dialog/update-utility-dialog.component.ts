import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  player1Utility: number;
  player2Utility: number;
}

@Component({
  selector: 'app-update-utility-dialog',
  templateUrl: './update-utility-dialog.component.html',
  styleUrls: ['./update-utility-dialog.component.scss']
})
export class UpdateUtilityDialogComponent implements OnInit {

  constructor(
    public readonly dialogRef: MatDialogRef<UpdateUtilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData
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
