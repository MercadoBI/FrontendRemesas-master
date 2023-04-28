import { Component, OnInit } from '@angular/core';
import { JsBase } from '../../../core/base/JsBase';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {
  ClienteResponse,
  ClienteBean,
  Cliente,
  validarListaMTCM,
  ListaMTCResponse,
  DetalleLogin,
  PaisesWU,
  DetalleEnvio,
  ResponseReceiverMoneySearch,
  Paises,
} from '../../../core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.sass'],
})
export class InformacionComponent extends JsBase implements OnInit {
  cliente: ClienteBean = {} as ClienteBean;
  Clientes: Cliente = {
    idCliente: '',
    tipoDocumento: '',
    nroDocumento: '',
    paisDocumento: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombreEmpresa: '',
    fechaNacimiento: '',
    fechaCaducidad: '',
    fechaEmision: '',
    codPaisNacimiento: '',
    codPaisNacionalidad: '',
    sexo: '',
    ocupacion: '',
    puestoCargo: '',
    direccion1: '',
    flagOtroPais: '',
    codPostal: '',
    departamento: '',
    provincia: '',
    distrito: '',
    email: '',
    flagTelefono: '',
    codTelfPais: '',
    numeroTelefono: '',
    flagTelfMovil: '',
    codMovilPais: '',
    numeroTelfMovil: '',
    pep: '',
    creadoPor: '',
    creadoFecha: '',
    actualizadoPor: '',
    actualizadoFecha: '',
  } as Cliente;
  lstCambioMoneda: Array<PaisesWU> = [];
  paisnombre: Array<Paises> = [];
  paisnombre2: Array<Paises> = [];
  paisbene: string;
  paisremi: string;
  detalleEnvio: DetalleEnvio = {} as DetalleEnvio;
  validarClienteMTCM: validarListaMTCM = {} as validarListaMTCM;
  detalleLogin: DetalleLogin = {} as DetalleLogin;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService
  ) {
    super(dialog);
  }

  ngOnInit(): void {
    this.api.getPaises().subscribe((response) => {
      localStorage.setItem('Paises', JSON.stringify(response));
    });

    if (localStorage.getItem('ClienteBeanPagoTranslado') != null) {
      this.cliente = <ClienteBean>(
        JSON.parse(<string>localStorage.getItem('ClienteBeanPagoTranslado'))
      );
      this.validarClienteMTCM = <validarListaMTCM>(
        JSON.parse(<string>localStorage.getItem('MTCNLista'))
      );
      //
      this.paisbene =
        this.validarClienteMTCM.mtcResponse.detalle.detalle.response.beneCountry;
      this.paisremi =
        this.validarClienteMTCM.mtcResponse.detalle.detalle.response.custCountry;

      //
      // if(localStorage.getItem('MTCNListaWU') != null){
      this.api.getPaises().subscribe((response) => {
        this.paisnombre =
          response.detalle.paises &&
          response.detalle.paises.filter(
            (e) =>
              e.codigo ===
              this.validarClienteMTCM.mtcResponse.detalle.detalle.response
                .custCountry
          );
        const pasiremi = JSON.stringify(this.paisnombre).split('"');
        this.validarClienteMTCM.mtcResponse.detalle.detalle.response.custCountry =
          pasiremi[7].toString();
      });

      //  this.lstCambioMoneda= JSON.parse(<string>sessionStorage.getItem("Paises"));
      // const pasiremi=JSON.stringify(this.paisnombre).split('"');
      //  this.validarClienteMTCM.mtcResponse.detalle.detalle.response.custCountry=pasiremi[3].toString();
      ///

      this.api.getPaises().subscribe((response) => {
        this.paisnombre2 =
          response.detalle.paises &&
          response.detalle.paises.filter(
            (e) =>
              e.codigo ===
              this.validarClienteMTCM.mtcResponse.detalle.detalle.response
                .beneCountry
          );
        const pasibene = JSON.stringify(this.paisnombre2).split('"');
        this.validarClienteMTCM.mtcResponse.detalle.detalle.response.beneCountry =
          pasibene[7].toString();
        console.log(this.paisbene + this.paisremi);
        localStorage.setItem(
          'MTCNLista',
          JSON.stringify(this.validarClienteMTCM)
        );
      });

      localStorage.setItem(
        'MTCNLista',
        JSON.stringify(this.validarClienteMTCM)
      );

      // }
      //
    } else {
      this.router.navigate(['/pago-translado-validacion']);
    }
  }
  valdiarUser() {
    // this.validarClienteMTCM.mtcResponse.detalle.detalle.response.beneCountry=this.paisbene;
    // this.validarClienteMTCM.mtcResponse.detalle.detalle.response.custCountry=this.paisremi;

    this.router.navigate(['/pago-translado-documento-identificacion']);
  }
}
