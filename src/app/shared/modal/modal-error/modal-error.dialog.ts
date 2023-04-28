import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../../core/dialog/JsDialogData';
@Component({
  selector: 'dialog-modal-error',
  templateUrl: './modal-error.dialog.html'
})

export class ModalErrorDialog  {

  constructor(
    public dialogRef: MatDialogRef<ModalErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}