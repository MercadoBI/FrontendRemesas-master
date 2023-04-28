import {environment} from '../../../environments/environment';

import {MatDialog} from '@angular/material/dialog';

import { ModalCargandoDialog } from '../../shared/modal/modal-cargando/modal-cargando.dialog';
import { ModalInformacionDialog } from '../../shared/modal/modal-informacion/modal-informacion.dialog';
import { ModalErrorDialog } from '../../shared/modal/modal-error/modal-error.dialog';
import { ModalAdvertenciaDialog } from '../../shared/modal/modal-advertencia/modal-advertencia.dialog';


export class JsBase {
    production = environment.production;
    host = environment.dominio.host;
    apiRest = environment.apiRest.host;
    dialogCargando: any;

    constructor(public dialog: MatDialog){

    }

    onModalInformacion(contenido: string) {
        const dialogRef = this.dialog.open(ModalInformacionDialog, {
            width: '400px',
            disableClose: true,
            data: {
            titulo: "Información", 
            contenido: contenido,
            btnCancelar: {visible: false , texto: "Cancelar"},
            btnAceptar: {visible: true , texto: "Cerrar"}
            }
        });
    }
    
    onModalError(contenido: string) {
        const dialogRef = this.dialog.open(ModalErrorDialog, {
            width: '400px',
            disableClose: true,
            data: {
            titulo: "Error", 
            contenido: contenido,
            btnCancelar: {visible: false , texto: "Cancelar"},
            btnAceptar: {visible: true , texto: "Cerrar"}
            }
        });
    }

    onModalAdvertencia(contenido: string) {
        const dialogRef = this.dialog.open(ModalAdvertenciaDialog, {
            width: '400px',
            disableClose: true,
            data: {
            titulo: "Advertencia", 
            contenido: contenido,
            btnCancelar: {visible: false , texto: "Cancelar"},
            btnAceptar: {visible: true , texto: "Cerrar"}
            }
        });
    }

    abrirCargando() {
        this.dialogCargando = this.dialog.open(ModalCargandoDialog, {
        width: '150px',
        height: '150px',
        disableClose: true,
        data: {
            titulo: ""
        }
        });
    }

    cerrarCargando(){
        this.dialogCargando.close(123);
    }
    
}