import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-game-dialog',
  templateUrl: './upload-game-dialog.component.html',
  styleUrls: ['./upload-game-dialog.component.scss']
})
export class UploadGameDialogComponent implements OnInit {

  public fileToUpload?: File;

  constructor(
    public readonly dialogRef: MatDialogRef<UploadGameDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  public onFileChanged(files: FileList): void {
    if (files.length) {
      this.fileToUpload = files[0];
    }
  }

  public async onSubmitClick(): Promise<void> {
    try {
      const fileReader = new FileReader();
      fileReader.onload = (_) => {
        console.log(fileReader.result);
        this.dialogRef.close(fileReader.result);
      };
      fileReader.readAsText(this.fileToUpload);
    } catch (err) {
      console.error(err);
    }
  }

}
