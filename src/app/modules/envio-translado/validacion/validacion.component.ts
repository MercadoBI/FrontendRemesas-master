import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { JsBase } from '../../../core/base/JsBase';
import {DasParametro, ClienteResponse , ClienteBean , ValidarListaNegraRequest, Paises, DetalleLogin, PaisesWU} from '../../../core/interfaces/JsInterfaces';
import { ModalConfirmacionDialog } from '../../../shared/modal/modal-confirmacion/modal-confirmacion.dialog';
import { ApiService } from 'src/app/service/api.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { ThisReceiver } from '@angular/compiler';
import { stringify } from 'querystring';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.sass'],
  providers: [DatePipe],
  template: '<input value="today">'
})

export class ValidacionComponent  extends JsBase implements OnInit {
  today: string = moment().format('L'); 
  
  validarListaNegraRequest: ValidarListaNegraRequest = {
    fechaNacimiento: "",
    nombreEmpresa: "",
    numeroDocumento: "",
    paisDocumentoId: "",
    primerApellido: "",
    primerNombre: "",
    segundoApellido: "",
    segundoNombre: "",
    tipoDocumentoId: ""
  } as ValidarListaNegraRequest;

  clienteBean : ClienteBean = {
    clienteResponse : {
      detalle : {
        Cliente : {
          nombre : ""
        }
      }
    }
  } as  ClienteBean;

  detalleLogin :DetalleLogin={}as DetalleLogin;
  clienteResponse: ClienteResponse = {
    detalle: {
      Cliente: {
        nombre: "",
        apellidoPaterno: "",
        nombreEmpresa: "",
        fechaNacimiento: "",
        paisDocumento: ""
      }
    }
  } as ClienteResponse;
  fechaActual=  new Date();
  lstPaisExpedicionDocumento: Array<Paises> = [];
  codpais: Paises={}as Paises;
  isDisableSn: boolean = false;
  isDisableAm: boolean = false;
  isDisableAll: boolean=false;
  dateTime= new Date();
  note :string;
  codigoPais:string;
  lstCambioMoneda2:Array<PaisesWU>=[];
  codPais:PaisesWU={}as PaisesWU;
  Doc:string;
  constructor(private datepipe: DatePipe,private router: Router, public dialog: MatDialog,
    private api: ApiService,private dateAdapter: DateAdapter<Date>) { 
    super(dialog);
    this.dateAdapter.setLocale('en-GB')
    this.dateTime.getDate()
  }

  ngOnInit(): void {
  
    this.abrirCargando();
    this.api.getPaises().subscribe(response =>{
      this.cerrarCargando();
      this.lstPaisExpedicionDocumento =response.detalle.paises;
    }
    )

    if (localStorage.getItem("ClienteBeanEnvioTranslado") != null) {
      this.clienteBean = <ClienteBean>JSON.parse(<string>localStorage.getItem("ClienteBeanEnvioTranslado"));
  
      if (this.clienteBean.clienteResponse.estado == "0") {
      } else {
        this.clienteBean.clienteResponse.detalle = this.clienteResponse.detalle;
        this.clienteBean.clienteResponse.detalle.Cliente.flagOtroPais="2";
      }
    } else {
      this.router.navigate(['/envio-translado-busqueda']);
    }  
    if(this.clienteBean.clienteResponse.detalle.Cliente.apellidoPaterno.length>2&&this.clienteBean.clienteResponse.detalle.Cliente.apellidoMaterno.length<2){          
      this.onDisableRb('am');
      this.isDisableAm=true;            
     }
     if(this.clienteBean.clienteResponse.detalle.Cliente.apellidoPaterno.length>2&&this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre.length<2){          
      this.onDisableRb('sn');
      this.isDisableSn=true;            
     }
     if(this.clienteBean.clienteResponse.detalle.Cliente.nombre.length>2){       
       
      this.isDisableAll=true;  
      this.note="bloqueado"; 
  

   
     }
 
  }

  toggleNoteState () { }
  isNoteChecked () {}
  onVolver() {
    localStorage.setItem("ClienteBeanEnvioTranslado", JSON.stringify(this.clienteBean.clienteRequest));
    this.router.navigate(['/envio-translado-busqueda']);
  }

  async onCrearCliente(cliente: ClienteBean) {    
    console.log("onCrearClienteValidacion:",cliente);
    console.log("onCrearClienteValidacion:",JSON.stringify(cliente));
    const clientes = cliente.clienteResponse.detalle.Cliente
    await this.api.postCrearCliente(clientes).subscribe(res => {
      localStorage.removeItem("ClienteBeanEnvioTranslado");
      this.clienteBean.clienteResponse = res;
      localStorage.setItem("ClienteBeanEnvioTranslado", JSON.stringify(this.clienteBean));
    });
  }

  async onValidar() {
    this.abrirCargando();
    const cucho = this.validarCasillas()
    if (cucho){   
      
    const cliente = this.clienteBean.clienteResponse.detalle.Cliente;
    const listanegra = this.validarListaNegraRequest;
    cliente.nroDocumento ? cliente.nroDocumento : cliente.nroDocumento = this.clienteBean.clienteRequest.numeroDocumento;
    cliente.tipoDocumento ? cliente.tipoDocumento : cliente.tipoDocumento = this.clienteBean.clienteRequest.tipoDocumento;
    let fechanac = this.datepipe.transform(cliente.fechaNacimiento, "yyyy-MM-dd");
    listanegra.paisDocumentoId = this.codigoPais+'-'+cliente.paisDocumento;//"604-PERU";
    if(this.clienteBean.clienteRequest.tipoDocumento=="01"){
      this.Doc="1-D.N.I."
    }if(this.clienteBean.clienteResponse.detalle.Cliente.tipoDocumento=="02"){
      this.Doc="2-C.E."; 
    }if(this.clienteBean.clienteResponse.detalle.Cliente.tipoDocumento=="03"){
      this.Doc="3-P.T.P."  
    }if(this.clienteBean.clienteResponse.detalle.Cliente.tipoDocumento=="05"){
      this.Doc="5-Cedula de Identidad"
    }if(this.clienteBean.clienteResponse.detalle.Cliente.tipoDocumento=="06"){
      this.Doc="6-Pasaporte"
    }    
    console.log(this.Doc)
    listanegra.tipoDocumentoId =this.Doc;//"1-D.N.I.";
    listanegra.numeroDocumento = cliente.nroDocumento;
    listanegra.primerNombre = cliente.nombre;
    listanegra.segundoNombre = cliente.segundoNombre;
    listanegra.primerApellido = cliente.apellidoPaterno;
    listanegra.segundoApellido = cliente.apellidoMaterno;
    listanegra.nombreEmpresa = "";
    listanegra.fechaNacimiento = fechanac?.toString();
    this.clienteBean.clienteResponse.detalle.Cliente.fechaNacimiento = fechanac?.toString();
    
    
     this.onCrearCliente(this.clienteBean);
     const slow$ = timer(7000);
     slow$.subscribe(()=>{this.router.navigate(['/envio-translado-informacion-transferencia'])});
     this.cerrarCargando();
    
    
   /*await this.api.postValidarListaNegra(this.validarListaNegraRequest).subscribe(res => {      
      const cliente = this.clienteBean.clienteResponse.detalle.Cliente;
      let response = res.detalle.ListaNegraResponse.existeEnLista;
      //preguntar si debo registrar cliente estando en lista negra  
      if (response == "N") {
        if (!cliente.idCliente) {
          this.onCrearCliente(this.clienteBean);
        }
     
       
        this.onModalConfirmacion("Cliente no esta en lista negra", response);
        this.cerrarCargando();
       // this.router.navigate(['/envio-translado-informacion-transferencia']);
        
      } else if (response == "S") {
        
        this.cerrarCargando();
        this.onModalAdvertencia("Comunicarse a la línea Azteca");
        this.onModalAdvertencia("Cliente esta en lista negra");        
        localStorage.removeItem("ClienteBeanEnvioTranslado");
        this.cerrarCargando();   
        this.router.navigate(['/envio-translado-busqueda']);
      } else {
       
        this.cerrarCargando();
        this.onModalConfirmacion("Hubo un Error interno", "");
      }
    
    
    this.cerrarCargando();
    })*/
    this.cerrarCargando();
  }
  }

  
  onModalConfirmacion(contenido: string, value: string) {
    const dialogRef = this.dialog.open(ModalConfirmacionDialog, {
      width: '400px',
      disableClose: true,
      data: {
        titulo: "Confirmación",
        contenido: contenido,
        btnCancelar: { visible: true, texto: "Cancelar", color:"red" },
        btnAceptar: { visible: true, texto: "Continuar" }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && value == "N") {

        // localStorage.setItem("ClienteBeanPagoTranslado", JSON.stringify(this.clienteBean));
        this.router.navigate(['/envio-translado-informacion-transferencia']);
      }
      if (result && value == "S") {
        localStorage.removeItem("ClienteBeanPagoTranslado");
        this.router.navigate(['/envio-translado-busqueda']);
      }

    });
  };






  
  onDisableRb(param: string) {
    if(this.note!="bloqueado"){
    if (param == 'am') {
     
     // this.isDisableAm ? this.isDisableAm = false : this.isDisableAm = true;
      this.clienteBean.clienteResponse.detalle.Cliente.apellidoMaterno="";
      this.clienteBean.clienteResponse.detalle.Cliente.flagOtroPais="1"
      
    }
    if (param == 'sn') {
    
     // this.isDisableSn ? this.isDisableSn = false : this.isDisableSn = true;
      this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre="";
      
    }  
  }
}



  validarCasillas() { 
    const fecha=this.clienteBean.clienteResponse.detalle.Cliente.fechaNacimiento;
    localStorage.setItem("añoemi", JSON.stringify(fecha));
    const dt =(JSON.parse(<string>localStorage.getItem('añoemi')))
    const number = moment(new Date()).format('YYYYMMDD');//(this.datepipe.transform(new Date(),"dd-MM-yyyy"));
    localStorage.setItem("añoact", JSON.stringify(number));
    const fact=(JSON.parse(<string>localStorage.getItem('añoact')));
    const numberemi = moment(dt).format('YYYYMMDD');
    console.log(numberemi+' '+fact)

    //
    this.lstCambioMoneda2 =  JSON.parse(<string>sessionStorage.getItem("PaisesWU"));
   
    const test = [];
    for (let item of  this.lstPaisExpedicionDocumento) {
    
      let item2=item;
      if(item2.pais ==this.clienteBean.clienteResponse.detalle.Cliente.paisDocumento){
        this.codpais=item2;
        test.push(item2);
      }  
    }
   const d=JSON.stringify(test).split('"');
    this.codigoPais=d[3].toString();
//
const test2 = [];
for (let item of  this.lstCambioMoneda2) {

  let item2=item;
  if(item2.isO_COUNTRY_CD ==  this.codigoPais){
    this.codPais=item2;
    test2.push(item2);
  }  
}
const d2=JSON.stringify(test2).split('"');   
    this.codigoPais=d2[7].toString();
//
  //    
    if(this.clienteBean.clienteResponse.detalle.Cliente.paisDocumento =='' &&
      this.clienteBean.clienteResponse.detalle.Cliente.nombre== '' &&
      this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre== undefined &&
      this.clienteBean.clienteResponse.detalle.Cliente.apellidoMaterno== undefined &&
            this.clienteBean.clienteResponse.detalle.Cliente.fechaNacimiento == undefined &&
     this.clienteBean.clienteResponse.detalle.Cliente.nombreEmpresa == ''
      ){
      this.onModalAdvertencia("Debe ingresar los datos solicitados");
    
      return false;
    }
    if(this.clienteBean.clienteResponse.detalle.Cliente.paisDocumento == undefined || this.clienteBean.clienteResponse.detalle.Cliente.paisDocumento == ""){
    this.onModalAdvertencia("Falta ingresar Pais de Documento");
    
    return false;
  }  
    if(this.clienteBean.clienteResponse.detalle.Cliente.nombre== undefined || (this.clienteBean.clienteResponse.detalle.Cliente.nombre == "")){
      this.onModalAdvertencia("Falta ingresar Nombre");
      return false;
    }   
 
    if(!this.isDisableSn){    
      if(this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre== undefined || (this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre == "")){
        this.onModalAdvertencia("Falta ingresar Segundo Nombre");
        return false;
      }      

    }
    
    if(this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre== null){
      this.onModalAdvertencia("Falta ingresar Segundo Nombre");
      return false;}    
    if(this.clienteBean.clienteResponse.detalle.Cliente.apellidoPaterno== undefined || (this.clienteBean.clienteResponse.detalle.Cliente.apellidoPaterno == "")){
      this.onModalAdvertencia("Falta ingresar Apellido Paterno");
      return false;
    }     if(this.clienteBean.clienteResponse.detalle.Cliente.apellidoMaterno == null){
      this.onModalAdvertencia("Falta ingresar Apellido Materno");
      return false;}
      
      if(!this.isDisableAm){    
      if(this.clienteBean.clienteResponse.detalle.Cliente.apellidoMaterno== undefined || (this.clienteBean.clienteResponse.detalle.Cliente.apellidoMaterno == "")){
        this.onModalAdvertencia("Falta ingresar Apellido Materno");
        return false;
      }
     } if(this.clienteBean.clienteResponse.detalle.Cliente.nombreEmpresa == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.nombreEmpresa == "")){
      this.onModalAdvertencia("Falta ingresar Nombre de Empresa");
      return false;
    }   if(this.clienteBean.clienteResponse.detalle.Cliente.fechaNacimiento == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.fechaNacimiento == "")){
      this.onModalAdvertencia("Falta ingresar Fecha Nacimiento");
      return false;
    }   if(parseInt(fact) < parseInt(numberemi)) {
      this.onModalAdvertencia("La Fecha de Nacimiento no puede ser igual o Mayor a la Fecha actual");
      return false;
    }
      return true;
   }

}

function timeout(arg0: { each: number; with: () => any; }): import("rxjs").OperatorFunction<number, unknown> {
  throw new Error('Function not implemented.');
}
