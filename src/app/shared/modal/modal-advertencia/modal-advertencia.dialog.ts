import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../../core/dialog/JsDialogData';
@Component({
  selector: 'dialog-modal-advertencia',
  templateUrl: './modal-advertencia.dialog.html'
})

export class ModalAdvertenciaDialog  {

  constructor(
    public dialogRef: MatDialogRef<ModalAdvertenciaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}