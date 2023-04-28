import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { JsBase } from '../../../core/base/JsBase';
import { JsDasParametro } from '../../../core/maestra/JsDasParametro';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  DetalleLogin,
  DasParametro,
  ClienteBean,
  ClienteRequest,
  RiaSearch,
  MTCParametro,
  MTCResponse,
  validarListaMTCM,
  ResponseReceiverMoneySearch,
} from '../../../core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.sass'],
})
export class BusquedaComponent extends JsBase implements OnInit {
  lstTipoDocumento: Array<DasParametro> = [];

  clienteBean: ClienteBean = {} as ClienteBean;

  clienteRequest: ClienteRequest = {} as ClienteRequest;
  riaSearch: RiaSearch = {} as RiaSearch;

  mtcParametro: MTCParametro = {} as MTCParametro;

  validarListaMTCM: validarListaMTCM = {} as validarListaMTCM;

  responseReceiverMoneySearch: ResponseReceiverMoneySearch =
    {} as ResponseReceiverMoneySearch;

  detalleLogin: DetalleLogin = {} as DetalleLogin;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    localStorage.removeItem('ClienteBeanPagoTranslado');
    localStorage.removeItem('MTCNLista');
    localStorage.removeItem('remesadatos');
    localStorage.removeItem('confirmaremesa');
    localStorage.removeItem('ClienteBeanEnvioTranslado');
    localStorage.removeItem('DetalleWu');
    localStorage.removeItem('ListaRemesaEnvio');

    if (localStorage.getItem('clienteRequestEnvioTranslado') != null) {
      this.clienteRequest = <ClienteRequest>(
        JSON.parse(<string>localStorage.getItem('clienteRequestEnvioTranslado'))
      );
      localStorage.removeItem('clienteRequestEnvioTranslado');
    }
    this.abrirCargando();
    this.api.getDasParametro('TIPODOC').subscribe((response) => {
      this.cerrarCargando();
      this.lstTipoDocumento = response.detalle.parametros;
    });
  }

  validarBuscarClientePago() {
    const regex = /^[0-9]*$/;
    const doc = regex.test(this.clienteRequest.numeroDocumento);

    if (this.mtcParametro.Pin == undefined || this.mtcParametro.Pin == '') {
      this.onModalAdvertencia('Falta ingresar Código MTCM');

      return false;
    }
    if (
      this.clienteRequest.tipoDocumento == undefined ||
      this.clienteRequest.tipoDocumento == ''
    ) {
      this.onModalAdvertencia('Falta ingresar Tipo de Documento');

      return false;
    }
    if (this.clienteRequest.numeroDocumento == undefined) {
      this.onModalAdvertencia('Falta ingresar Número de Documento');
      return false;
    }
    if (
      doc != true &&
      this.clienteRequest.numeroDocumento.length != 8 &&
      this.clienteRequest.tipoDocumento == '01'
    ) {
      this.onModalAdvertencia('El DNI debe tener 8 dígitos');
      return false;
    }
    if (doc == false && this.clienteRequest.tipoDocumento == '01') {
      this.onModalAdvertencia('El DNI debe ser numérico');
      return false;
    }
    if (
      this.clienteRequest.numeroDocumento.length != 9 &&
      this.clienteRequest.tipoDocumento == '02'
    ) {
      this.onModalAdvertencia('El Carnet De Extrangeria debe tener 9 dígitos');
      return false;
    }
    if (doc == false && this.clienteRequest.tipoDocumento == '02') {
      this.onModalAdvertencia('El Carnet De Extrangeria debe ser numérico ');
      return false;
    }
    if (
      this.clienteRequest.numeroDocumento.length != 8 &&
      this.clienteRequest.tipoDocumento == '03'
    ) {
      this.onModalAdvertencia(
        'El Permiso Temp Permanencia PTP debe tener 8 dígitos '
      );
      return false;
    }
    if (
      this.clienteRequest.numeroDocumento.length <= 7 &&
      this.clienteRequest.numeroDocumento.length >= 13 &&
      this.clienteRequest.tipoDocumento == '04'
    ) {
      this.onModalAdvertencia(
        'El Carnet de Refugiado no puede ser menor de 8 dígitos ni mayor de 12 dígitos '
      );
      return false;
    }
    if (
      this.clienteRequest.numeroDocumento.length <= 7 &&
      this.clienteRequest.numeroDocumento.length >= 13 &&
      this.clienteRequest.tipoDocumento == '05'
    ) {
      this.onModalAdvertencia(
        'El Cédula de Identidad no puede ser menor de 8 dígitos  ni mayor de 12 dígitos '
      );
      return false;
    }
    if (
      this.clienteRequest.numeroDocumento.length <= 6 &&
      this.clienteRequest.numeroDocumento.length >= 13 &&
      this.clienteRequest.tipoDocumento == '06'
    ) {
      this.onModalAdvertencia(
        'El Pasaporte no puede ser menor de 7 dígitos ni mayor de 12  dígitos '
      );
      return false;
    }

    if (
      this.mtcParametro.Pin.length >= 12 ||
      this.mtcParametro.Pin.length <= 9
    ) {
      this.onModalAdvertencia('Verifique Los dígitos de su MTCN ');
      return false;
    }
    return true;
  }

  onBuscarCliente() {
    if (this.validarBuscarClientePago()) {
      //this.abrirCargando();
      this.api.getCliente(this.clienteRequest).subscribe((response) => {
        this.clienteBean.clienteRequest = this.clienteRequest;
        this.clienteBean.clienteResponse = response;
        localStorage.setItem(
          'ClienteBeanPagoTranslado',
          JSON.stringify(this.clienteBean)
        );
        this.cerrarCargando();

        if (this.mtcParametro.Pin.length == 11) {
          this.api.postValidarMTC(this.mtcParametro).subscribe((res) => {
            if (res.detalle.detalle.response == null) {
              this.onModalAdvertencia('MTCN es Inválido');
            }
            const msgError = res.detalle.detalle.response.responseCode;
            if (res) {
            }
            if (msgError == '2002') {
              this.onModalAdvertencia('Pago ya realizado');
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '2010') {
              this.onModalAdvertencia('Orden no válida para Alfin Banco');
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '2005') {
              this.onModalAdvertencia(
                'No corresponde al método de pago designado'
              );
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '5000') {
              this.onModalAdvertencia('Valor inválido para el ID');
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '5002') {
              this.onModalAdvertencia(
                'Se produjo un error con la validación de datos'
              );
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '5003') {
              this.onModalAdvertencia(
                'Cliente inválido para realizar la transacción'
              );
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '2007') {
              this.onModalAdvertencia(
                'Orden no esta disponible. Por favor contacte con el remitente.'
              );
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '2001') {
              this.onModalAdvertencia('Pago no encontrado');
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '5001' || msgError == null) {
              this.onModalAdvertencia('Valor no válido');
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '2003') {
              this.onModalAdvertencia('Pago Cancelado');
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '2004') {
              this.onModalAdvertencia('Pago en Verificación');
              this.onModalInformacion('Favor Confirmar el Código');
            }
            if (msgError == '2006') {
              this.onModalAdvertencia('Otro Pagador');
              this.router.navigate(['/pago-translado-busqueda']);
            }
            if (msgError == '1000') {
              this.router.navigate(['/pago-translado-validacion']);
              //agregar al localStorage
              this.validarListaMTCM.mtcResponse = res;
              this.validarListaMTCM.mtcResponse.detalle.detalle.response.custNameLast2 =
                res.detalle.detalle.response.custNameLast2 != null
                  ? res.detalle.detalle.response.custNameLast2
                  : ' ';
              this.validarListaMTCM.mtcResponse.detalle.detalle.response.beneNameLast2 =
                res.detalle.detalle.response.beneNameLast2 != null
                  ? res.detalle.detalle.response.beneNameLast2
                  : ' ';
              localStorage.setItem(
                'MTCNLista',
                JSON.stringify(this.validarListaMTCM)
              );
              // localStorage.setItem("ClienteBeanPagoTranslado", JSON.stringify(this.clienteBean))
            }
          });
        }

        if (this.mtcParametro.Pin.length == 10) {
          this.api.postValidarMTCNWU(this.mtcParametro).subscribe((res) => {
            if (res == null) {
              this.onModalAdvertencia('MTCN es Inválido');
              return;
            }
            localStorage.setItem('MTCNListaWU', JSON.stringify(res));

            this.responseReceiverMoneySearch = <ResponseReceiverMoneySearch>(
              JSON.parse(<string>localStorage.getItem('MTCNListaWU'))
            );

            const validarListaMTCM = {
              mtcResponse: {
                detalle: {
                  detalle: {
                    response: {
                      custNameFirst:
                        this.responseReceiverMoneySearch.sender.name.givenName,
                      custNameLast1:
                        this.responseReceiverMoneySearch.sender.name
                          .paternalName,
                      custNameLast2:
                        this.responseReceiverMoneySearch.sender.name
                          .maternalName,
                      custCountry:
                        this.responseReceiverMoneySearch.paymentDetails
                          .originatingCountryCurrency.isoCode.countryCode,
                      beneNameFirst:
                        this.responseReceiverMoneySearch.receiver.name
                          .givenName,
                      beneNameLast1:
                        this.responseReceiverMoneySearch.receiver.name
                          .paternalName,
                      beneNameLast2:
                        this.responseReceiverMoneySearch.receiver.name
                          .maternalName,
                      beneCountry:
                        this.responseReceiverMoneySearch.paymentDetails
                          .destinationCountryCurrency.isoCode.countryCode,
                      beneAmount:
                        this.responseReceiverMoneySearch.financials.payAmount /
                        100,
                    },
                  },
                },
              },
            };
            localStorage.setItem('MTCNLista', JSON.stringify(validarListaMTCM));
            this.router.navigate(['/pago-translado-validacion']);
          });
        }
      });
    }
  }


  
}
