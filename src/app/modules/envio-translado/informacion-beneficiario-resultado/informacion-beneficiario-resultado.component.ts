import { Component, OnInit } from '@angular/core';
import { JsBase } from '../../../core/base/JsBase';
import { MatDialog } from '@angular/material/dialog';
import {
  DetalleEnvio,
  DetalleLogin,
  DetalleTipoCambio,
  Paises,
  PaisesWU,
  RemesaTabla,
  ReqEnviarecibeRemesa,
} from 'src/app/core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { ModalConfirmacionDialog } from 'src/app/shared/modal/modal-confirmacion/modal-confirmacion.dialog';
import { parse } from 'path';

@Component({
  selector: 'app-informacion-beneficiario-resultado',
  templateUrl: './informacion-beneficiario-resultado.component.html',
  styleUrls: ['./informacion-beneficiario-resultado.component.sass'],
})
export class InformacionBeneficiarioResultadoComponent
  extends JsBase
  implements OnInit
{
  lstPaisResidencia: Array<Paises> = [{ codigo: 'PE', pais: 'Peru' }];
  detalleEnvio: DetalleEnvio = {
    sender: {},
    receiver: {},
    financials: {},
    paymentDetails: {},
  } as DetalleEnvio;
  lstCambioMoneda: Array<PaisesWU> = [];
  paisnombre: Array<PaisesWU> = [];
  ApellidosReceiver: string = '';
  ApellidosSender: string = '';
  Cantidad: string = '';
  CantidadTotal: string = '';
  detalleLogin: DetalleLogin = {} as DetalleLogin;
  ReqEnviarecibeRemesa: ReqEnviarecibeRemesa = {} as ReqEnviarecibeRemesa;
  //resValicacionWU: resValicacionWU={}as resValicacionWU;
  listaPa: Array<string> = [];
  listaremesa: RemesaTabla = {} as RemesaTabla;
  validar: boolean = false;
  valiCli: boolean = false;
  detalleTipoCambio: DetalleTipoCambio = {} as DetalleTipoCambio;
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
    this.detalleEnvio = <DetalleEnvio>(
      JSON.parse(<string>localStorage.getItem('DetalleWu'))
    );
    this.listaremesa = <RemesaTabla>(
      JSON.parse(<string>localStorage.getItem('ListaRemesaEnvio'))
    );
    this.detalleTipoCambio = <DetalleTipoCambio>(
      JSON.parse(<string>localStorage.getItem('dinero'))
    );

    this.ApellidosReceiver =
      this.detalleEnvio.receiver.paternalNameReceiver +
      '  ' +
      this.detalleEnvio.receiver.maternalNameReceiver;
    this.ApellidosSender =
      this.detalleEnvio.sender.paternalNameSender +
      '  ' +
      this.detalleEnvio.sender.maternalNameSender;
    this.CantidadTotal = (
      parseInt(
        this.detalleTipoCambio.detalle.RespuestaWU.grossTotalAmount.toString()
      ) / 100
    ).toString();
    this.Cantidad = (
      parseInt(
        this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount.toString()
      ) / 100
    ).toString();

    // this.pais();

    // }

    //pais(){

    this.lstCambioMoneda = JSON.parse(
      <string>sessionStorage.getItem('PaisesWU')
    );
    this.paisnombre =
      this.lstCambioMoneda &&
      this.lstCambioMoneda.filter(
        (e) =>
          e.isO_COUNTRY_CD ===
            this.detalleEnvio.paymentDetails.destinationCountrycodeReceiver &&
          e.currencY_CD ===
            this.detalleEnvio.paymentDetails.destinationCurrencycodeReceiver
      );
  }
  /*
  agregar en html y borrar el [(Ngmodel)]
  [value]="item.countrY_LONG" *ngFor="let item of paisnombre"
  
  */

  onDisableRb(param: string) {
    if (param == 'val') {
      this.validar ? (this.validar = false) : (this.validar = true);
    }
    /* if(param=='valCli'){    
      this.valiCli?this.valiCli=false:this.valiCli=true;  
    }*/
  }

  onSendBT() {
    if (this.validar == true) {
      this.onModalConfirmacion('Confirmar Remesa');
    } else {
      this.onModalAdvertencia('Validar Terminos y Condiciones ');
    }
  }

  onModalConfirmacion(contenido: string) {
    const dialogRef = this.dialog.open(ModalConfirmacionDialog, {
      width: '400px',
      disableClose: true,
      data: {
        titulo: 'Confirmación',
        contenido: contenido,
        btnCancelar: {
          visible: true,
          texto: 'Cancelar',
          className: 'btn-primary',
        },
        btnAceptar: { visible: true, texto: 'Continuar' },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const envia_recibe_remesa = this.ReqEnviarecibeRemesa;
        const igv = '0'; //(parseFloat( this.CantidadTotal)*0.18).toString();
        envia_recibe_remesa.idremesa = this.detalleEnvio.idremesa; //this.resValicacionWU.mtcn;
        envia_recibe_remesa.envrec = 'E';
        envia_recibe_remesa.sucursal = '1'; // this.detalleLogin.detalle.estado.codigoAgencia;
        envia_recibe_remesa.usuario = "INSTALADOR"//this.detalleLogin.detalle.estado.usuarioLogin;
        envia_recibe_remesa.idremesadora = '1'; //2
        envia_recibe_remesa.mdapag = '101';
        envia_recibe_remesa.impmdapag = this.Cantidad;
        envia_recibe_remesa.impcomrem = (
          parseFloat(this.listaremesa.comision) * 0.87
        )
          .toFixed(2)
          .toString(); //0.87% de la comicion de enviosWU
        envia_recibe_remesa.impcombco = (
          parseFloat(this.listaremesa.comision) * 0.13
        )
          .toFixed(2)
          .toString();

        envia_recibe_remesa.impitf = '0';
        envia_recibe_remesa.impigv = '0';
        var respuesta = '';
        var mensajerespuesta = '';
        console.log(envia_recibe_remesa);
        this.api.postEnviaRecibeRemesa(envia_recibe_remesa).subscribe((res) => {
          if (res.estado !== '0') {
            // res.detalle.EnviaRecibeRemesasResponse.erroresnegocio.btErrorNegocio.map(
            //   (e) => {
            //     (respuesta = e.codigo), (mensajerespuesta = e.descripcion);
            //   }
            // );
            mensajerespuesta = res.mensaje;
            respuesta = res.estado ;
          }

          if (respuesta != '') {
            this.onModalAdvertencia(mensajerespuesta);
            return;
          } else {
            this.onModalInformacion(
            'Su envío se registró con éxito \n IDREMESA 0000' +this.detalleEnvio.idremesa);
            localStorage.removeItem('ClienteBeanEnvioTranslado');
            localStorage.removeItem('ListaRemesaEnvio');
            localStorage.removeItem('MTCNListaWU');
            localStorage.removeItem('estado');
            localStorage.removeItem('dinero');
            localStorage.removeItem('añoemi');
            localStorage.removeItem('añoact');
            localStorage.removeItem('DetalleWU');
            this.router.navigate(['/inicio']);
          }
        });
      }
    });
  }
}
