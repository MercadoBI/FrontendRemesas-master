import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../../core/dialog/JsDialogData';
@Component({
  selector: 'dialog-modal-informacion',
  templateUrl: './modal-informacion.dialog.html'
})

export class ModalInformacionDialog  {

  constructor(
    public dialogRef: MatDialogRef<ModalInformacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}