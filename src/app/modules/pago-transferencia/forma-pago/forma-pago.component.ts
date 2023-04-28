import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MTCResponse,
  validarListaMTCM,
  RemesaResponse,
  RemesaTabla,
  ReqEnviarecibeRemesa,
  DetalleLogin,
  ResponseReceiverMoneySearch,
} from 'src/app/core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';
import { JsBase } from 'src/app/core/base/JsBase';
import { Router } from '@angular/router';
import { ModalConfirmacionDialog } from '../../../shared/modal/modal-confirmacion/modal-confirmacion.dialog';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.sass'],
})
export class FormaPagoComponent extends JsBase implements OnInit {
  ReqEnviarecibeRemesa: ReqEnviarecibeRemesa = {} as ReqEnviarecibeRemesa;
  validarClienteMTCM: validarListaMTCM = {} as validarListaMTCM;
  RemesaResponse: RemesaResponse = {} as RemesaResponse;
  remesaTabla: RemesaTabla = {} as RemesaTabla;
  detalleLogin: DetalleLogin = {} as DetalleLogin;
  responseReceiverMoneySearch: ResponseReceiverMoneySearch =
    {} as ResponseReceiverMoneySearch;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.detalleLogin = <DetalleLogin>(
      JSON.parse(<string>sessionStorage.getItem('UsuarioLogin'))
    );
    this.validarClienteMTCM = <validarListaMTCM>(
      JSON.parse(<string>localStorage.getItem('MTCNLista'))
    );
  }

  onvalidarpago() {
    this.onModalConfirmacion('Confirmar Remesa');
  }

  onModalConfirmacion(contenido: string) {
    const dialogRef = this.dialog.open(ModalConfirmacionDialog, {
      width: '400px',
      disableClose: true,
      data: {
        titulo: 'Confirmación',
        contenido: contenido,
        btnCancelar: { visible: true, texto: 'Cancelar' },
        btnAceptar: { visible: true, texto: 'Continuar' },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const envia_recibe_remesa = this.ReqEnviarecibeRemesa;
        this.RemesaResponse = <RemesaResponse>(
          JSON.parse(<string>localStorage.getItem('remesadatos'))
        );

        if (this.RemesaResponse.detalle.idremesa != null) {
          if (this.RemesaResponse.estado == '0') {
            // var igv = parseFloat(this.validarClienteMTCM.mtcResponse.detalle.detalle.response.beneAmount)*0.18
            envia_recibe_remesa.idremesa =
              this.RemesaResponse.detalle.idremesa.toString();
            console.log(this.RemesaResponse.detalle.idremesa.toString());
            envia_recibe_remesa.envrec = 'R';
            envia_recibe_remesa.sucursal =
              this.detalleLogin.detalle.estado.codigoAgencia;
            envia_recibe_remesa.usuario =
              this.detalleLogin.detalle.estado.usuarioLogin;
            if (localStorage.getItem('MTCNListaWU') != null) {
              envia_recibe_remesa.idremesadora = '2';
            } else {
              envia_recibe_remesa.idremesadora = '1';
            }
            envia_recibe_remesa.mdapag = '2';
            envia_recibe_remesa.impmdapag =
              this.validarClienteMTCM.mtcResponse.detalle.detalle.response.beneAmount.toString();
            envia_recibe_remesa.impcomrem = '0';
            if (localStorage.getItem('MTCNListaWU') != null) {
              this.responseReceiverMoneySearch = <ResponseReceiverMoneySearch>(
                JSON.parse(<string>localStorage.getItem('MTCNListaWU'))
              );
              envia_recibe_remesa.impcombco = (
                (this.responseReceiverMoneySearch.financials.charges / 100) *
                0.13
              )
                .toFixed(2)
                .toString();
            } else {
              envia_recibe_remesa.impcombco = '2'; //0.8 entero para ria.//0.13% PagosWU//0.13% enviosWU
            }
            envia_recibe_remesa.impitf = '0';
            envia_recibe_remesa.impigv = '0';
            var respuesta = '';
            var mensajerespuesta = '';
            this.api
              .postEnviaRecibeRemesa(envia_recibe_remesa)
              .subscribe((res) => {
                res.detalle.EnviaRecibeRemesasResponse.erroresnegocio.btErrorNegocio.map(
                  (e) => {
                    (respuesta = e.codigo), (mensajerespuesta = e.descripcion);
                  }
                );
                if (respuesta != '') {
                  this.onModalAdvertencia(mensajerespuesta);
                  return;
                } else {
                  this.onModalInformacion(
                    'Su pago se registró con éxito \n IDREMESA    0000' +
                      this.RemesaResponse.detalle.idremesa.toString()
                  );
                  localStorage.removeItem('ClienteBeanPagoTranslado');
                  localStorage.removeItem('confirmaremesa');
                  localStorage.removeItem('MTCNLista');
                  localStorage.removeItem('MTCNListaWU');
                  this.router.navigate(['/inicio']);
                }
              });
          }
        }
      }
    });
  }
}
