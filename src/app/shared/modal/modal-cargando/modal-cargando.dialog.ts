import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../../core/dialog/JsDialogData';
@Component({
  selector: 'dialog-modal-cargando',
  templateUrl: './modal-cargando.dialog.html'
})

export class ModalCargandoDialog  {

  constructor(
    public dialogRef: MatDialogRef<ModalCargandoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close();
  }

}