import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../../core/dialog/JsDialogData';
@Component({
  selector: 'dialog-modal-confirmacion',
  templateUrl: './modal-confirmacion.dialog.html'
})

export class ModalConfirmacionDialog  {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    onOk(): void {
      this.dialogRef.close();
    }

}