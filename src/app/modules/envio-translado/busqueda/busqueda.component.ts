import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

import { JsBase } from '../../../core/base/JsBase';
import { DasParametro, ClienteBean , ClienteRequest, MTCParametro, PaisesWU, DetallePaisesWU, DetalleLogin } from '../../../core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.sass']
})
export class BusquedaComponent extends JsBase implements OnInit {
  detalleLogin:DetalleLogin={}as DetalleLogin;
  lstTipoDocumento : Array<DasParametro> = [];

  clienteBean : ClienteBean = {} as ClienteBean;

  clienteRequest : ClienteRequest = { } as ClienteRequest;

  lstCambioMoneda:Array<PaisesWU>=[];

  constructor(private router: Router,private api: ApiService, public dialog: MatDialog) { 
    super(dialog);
  } 
 
  
  ngOnInit(): void {
    
    localStorage.removeItem("ClienteBeanPagoTranslado");
    localStorage.removeItem("MTCNLista");
    localStorage.removeItem("remesadatos");
    localStorage.removeItem("confirmaremesa");
    localStorage.removeItem("ClienteBeanEnvioTranslado");
    localStorage.removeItem("DetalleWu");
    localStorage.removeItem("ListaRemesaEnvio");

    if(localStorage.getItem("ClienteBeanEnvioTranslado") != null){
      this.clienteRequest = <ClienteRequest> JSON.parse(<string>localStorage.getItem("ClienteBeanEnvioTranslado"));
      localStorage.removeItem("ClienteBeanEnvioTranslado");
    }
    
   

    this.abrirCargando();
    this.api.getDasParametro("TIPODOC").subscribe( response =>{
        this.cerrarCargando();
        this.lstTipoDocumento = response.detalle.parametros;
      }
    )
  }
  
 

  validarBuscarCliente() {
    const regex = /^[0-9]*$/;
    const doc = regex.test(this.clienteRequest.numeroDocumento);

    if(this.clienteRequest.tipoDocumento == undefined || this.clienteRequest.tipoDocumento == ""){
      this.onModalAdvertencia("Falta ingresar Tipo de Documento");
      
      return false;
    }
    if(this.clienteRequest.numeroDocumento == undefined ){
      this.onModalAdvertencia("Falta ingresar Número de Documento");
      return false;
    }       
    if(this.clienteRequest.numeroDocumento.length!=8 && this.clienteRequest.tipoDocumento=="01"){
        this.onModalAdvertencia("El DNI debe tener 8 dígitos ")
      return false;
    } 
    if(doc== false && this.clienteRequest.tipoDocumento=="01"){
      this.onModalAdvertencia("El DNI debe ser numérico")
    return false;
     }  if(doc== false && this.clienteRequest.numeroDocumento.length!=9 && this.clienteRequest.tipoDocumento=="02"){
      this.onModalAdvertencia("El Carnet De Extrangeria debe tener 9 dígitos y solo números ")
      return false;
    }   if(doc== false  && this.clienteRequest.tipoDocumento=="02"){
      this.onModalAdvertencia("El Carnet De Extrangeria debe ser numérico")
      return false;
    }    if(this.clienteRequest.numeroDocumento.length!=9 && this.clienteRequest.tipoDocumento=="03"){
      this.onModalAdvertencia("El Permiso Temp Permanencia PTP debe tener 8 dígitos ")
      return false;
    }    if(this.clienteRequest.numeroDocumento.length<=7 && this.clienteRequest.numeroDocumento.length>=13 && this.clienteRequest.tipoDocumento=="04"){
      this.onModalAdvertencia("El Carnet de Refugiado no puede ser menor de 8 dígitos ni mayor de 12 dígitos ")
      return false;
    }  if(this.clienteRequest.numeroDocumento.length<=7 && this.clienteRequest.numeroDocumento.length>=13 && this.clienteRequest.tipoDocumento=="05"){
      this.onModalAdvertencia("El Cédula de Identidad no puede ser menor de 8 dígitos  ni mayor de 12 dígitos ")
      return false;
    }  if(this.clienteRequest.numeroDocumento.length<=6 && this.clienteRequest.numeroDocumento.length>=13 && this.clienteRequest.tipoDocumento=="06"){
      this.onModalAdvertencia("El Pasaporte no puede ser menor de 7 dígitos ni mayor de 12  dígitos ")
      return false;
    }
        
    return true;
  }



  
  onBuscarCliente(){
    if(this.validarBuscarCliente()){
        this.abrirCargando();
        this.api.getCliente(this.clienteRequest).subscribe( response =>{
          this.cerrarCargando();
          this.clienteBean.clienteRequest = this.clienteRequest;
          this.clienteBean.clienteResponse = response;
          localStorage.setItem("ClienteBeanEnvioTranslado", JSON.stringify(this.clienteBean));
          this.router.navigate(['/envio-translado-validacion']);
          }
      )
    }
  }




}
