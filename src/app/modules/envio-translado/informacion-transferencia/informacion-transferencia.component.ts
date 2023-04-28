import { Component, EventEmitter, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {Cliente, ClienteBean, ClienteResponse, DasParametro , DetalleEstados, detalleEstadosWu, DetalleEstadosWU, DetalleLogin, DetallePaisesWU, DetalleTipoCambio, Moneda, Paises, PaisesWU, Pep, RemesaTabla, ReqremesaCliente, TipoCambio, TipoCambioMoneda, Ubigeos, validarListaMTCM} from '../../../core/interfaces/JsInterfaces';
import { JsBase } from '../../../core/base/JsBase';
import { ApiService } from 'src/app/service/api.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-informacion-transferencia',
  templateUrl: './informacion-transferencia.component.html',
  styleUrls: ['./informacion-transferencia.component.sass'],
  providers: [DatePipe]
})
export class InformacionTransferenciaComponent extends JsBase implements OnInit {
  clienteBean: ClienteBean = {
    clienteResponse: {
      detalle: {
        Cliente: {
          nombre: '',
        },
      },
    },
  } as ClienteBean;
  clienteResponse: ClienteResponse = {
    detalle: {
      Cliente: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreEmpresa: '',
        fechaNacimiento: '',
        paisDocumento: ''

      },
    },
  } as ClienteResponse;
  lstpep: Array<DasParametro> = [];
  lstPaisResidencia:Array<Paises>=[{ codigo:"PE",pais:"Peru"}] 
  lstMoneda:Array<PaisesWU>=[];
  m:Array<PaisesWU>=[];
  lstEstados:Array<detalleEstadosWu>=[];
  paisesWU:PaisesWU={
    countrY_LONG:''
  }as PaisesWU;
  detallePaisesWU: DetallePaisesWU={} as DetallePaisesWU;
  tipoCambioMoneda: TipoCambioMoneda={} as TipoCambioMoneda;
  cantidadEnvio:string = '';
  cantidadrecibir:string = '';
  comision:string = '';
  igv:string = '';
  cantidadtotal: string = '';
  detalleTipoCambio: DetalleTipoCambio={}as DetalleTipoCambio;
  isDisableOP: boolean =false;
  isDisableTel: boolean=false;
  isDisablePhon:boolean=false;
  isDisableEst:boolean=false;
  lstCambioMoneda:Array<PaisesWU>=[];
  lstCambioMoneda2:Array<PaisesWU>=[];
  lstCambioMoneda3:Array<PaisesWU>=[];
  CambioMoneda:PaisesWU={}as PaisesWU;
  Paismoneda:Array<PaisesWU>=[];
  lstubigeos: Array<Ubigeos> = [];
  lstubigeosprovincia: Array<Ubigeos> = [];
  lstubigeosdistritos: Array<Ubigeos> = [];
  lstPaisNacimiento:  Array<Paises> = [];
  lstmotivo: Array<DasParametro> = [];
  lstocupacion: Array<DasParametro> = [];
  lstpuestocargo: Array<DasParametro> = [];
  lstOrigenFondo: Array<DasParametro> = [];
  lstRelacionDestinatario: Array<DasParametro> = [];
  lstsexo: Array<DasParametro> = [];
  lstcodPostal: Array<DasParametro> = [];
  lstcodPais: Array<DasParametro> = [];
  codep: string = '';
  codprov: string = '';
  coddist: string = '';
  reqremesaCliente: ReqremesaCliente = {} as ReqremesaCliente;
  cliente: Cliente = {} as Cliente;
  remesaTabla: RemesaTabla = {} as RemesaTabla;
  ListaMTCN: validarListaMTCM = {} as validarListaMTCM;
  listaremesa: RemesaTabla = {
    monedaEnvio: '',
  } as RemesaTabla;
  detalleLogin: DetalleLogin={}as DetalleLogin;
  estado:string;
  validar:boolean;
  constructor(
    private datepipe:DatePipe,
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    private dateAdapter: DateAdapter<Date>
    ) { 
    super(dialog);
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }
  ngOnInit(): void {  
    this.abrirCargando();
     this.clienteBean.clienteResponse.detalle.Cliente.codPostal="00000";
      if(sessionStorage.getItem("PaisesWU")!=null){      
        this.lstCambioMoneda2 =  JSON.parse(<string>sessionStorage.getItem("PaisesWU"));
      // this.CambioMoneda =  <PaisesWU>JSON.parse(<string>sessionStorage.getItem("PaisesWU"));
   //   

           const test = [];
          for (let item of  this.lstCambioMoneda2) {
          
            let item2=item;
            if(item2.countrY_LONG !=this.CambioMoneda.countrY_LONG && item2.isO_COUNTRY_CD !="PE"){
              this.CambioMoneda=item2;
              test.push(item2);
            }                      
         
          }
          sessionStorage.setItem("ListaPais",JSON.stringify(test));
          this.lstCambioMoneda= JSON.parse(<string>sessionStorage.getItem("ListaPais"));
          }
        
  
   
    if (localStorage.getItem('ClienteBeanEnvioTranslado') != null) {
      this.clienteBean = <ClienteBean>(
        JSON.parse(<string>localStorage.getItem('ClienteBeanEnvioTranslado'))
      );
            const tel=this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono;
        const cel=this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil;
        if(cel!=null && tel ==''){
          this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono=cel;
          this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil= tel;
        } 
        const valor2=this.clienteBean.clienteResponse.detalle.Cliente.ocupacion;
        if(valor2=="Domestic Helper"||valor2=="Prof Svc Practitioner"||valor2=="Religious/Church Servant"||valor2=="Retired"||valor2=="Security Guard"||valor2=="Driver"||valor2=="Prof Svc Practitioner"||valor2=="Housewife/Child Care"||valor2=="Domestic Helpe"||valor2=="Laborer-Agriculture"||valor2=="Laborer-Construction"||valor2=="Laborer-Manufacturing"||valor2=="Laborer- Oil/Gas/Mining"||valor2=="Non-profit/Volunteer"||valor2=="Unemployed"||valor2=="Student"||valor2=="Self-Employed"){
          this.clienteBean.clienteResponse.detalle.Cliente.puestoCargo == "";   
          this.lstpuestocargo=[];
      }else{
        this.api.getDasParametro('PUESTO').subscribe((response) => {
          this.cerrarCargando();      
          this.lstpuestocargo = response.detalle.parametros;    
           });  
        }

        if(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil==''){          
         this.oncheckvalidarTel('Y'); 
         this.isDisableTel=true;       
       
        }
        
        

      var departamento=this.clienteBean.clienteResponse.detalle.Cliente.departamento;
      departamento==null?departamento=" ":departamento;
      if(departamento!=null){
        this.clienteBean.clienteResponse.detalle.Cliente.departamento=" ";
      }  if (this.clienteBean.clienteResponse.estado=="0") {
        this.codep =
          departamento.split("/", 1).toString();
          this.clienteBean.clienteResponse.detalle.Cliente. departamento= departamento;
          if( this.codep.length>=2){
       this.codprov =
          this.clienteBean.clienteResponse.detalle.Cliente.provincia.split("/", 1).toString();
        this.coddist =
          this.clienteBean.clienteResponse.detalle.Cliente.distrito.split("/", 1).toString();
          }
       
      } else {
        this.clienteBean.clienteResponse.detalle = this.clienteResponse.detalle;
      }
    } else {
      this.router.navigate(['/envio-translado-validacion']);
    }  
    
    if (localStorage.getItem('ListaRemesaEnvio') != null) {
      this.lstMoneda= JSON.parse(<string>localStorage.getItem("ListaMoneda"));
 this.detalleTipoCambio= <DetalleTipoCambio> JSON.parse(<string>localStorage.getItem("dinero"));
      this.listaremesa = <RemesaTabla>(
        JSON.parse(<string>localStorage.getItem('ListaRemesaEnvio'))
      );
      
       this.paisesWU.countrY_LONG= this.listaremesa.paisPago;
        const moneda =  this.paisesWU.countrY_LONG.split('/');
      // this.lstMoneda=[{item:moneda[0].toString(),value:moneda[0].toString()}]   
      this.tipoCambioMoneda.destinationCountryIsoCurrency= moneda[0].toString();


      const test = [];
      for (let item of this.lstMoneda) {
      
        let item2=item;        
        if(item2.countrY_LONG !=this.CambioMoneda.countrY_LONG){
          this.CambioMoneda=item2;
          test.push(item2);
        }         
        sessionStorage.setItem("m",JSON.stringify(test));
        const m= JSON.parse(<string>sessionStorage.getItem("m"));             
        
        sessionStorage.removeItem("m");
      }
     /* const m=  this.lstMoneda&&this.lstMoneda.filter(
        (e) => e.currencY_CD !==moneda[0].toString());//"USD");*/
        
        this.paisesWU.countrY_LONG=test[0].currencY_CD.toString()+"/"+test[0].isO_COUNTRY_CD.toString();//moneda[1].toString();
        this.listaremesa.tipoCambio=(parseFloat(this.listaremesa.tipoCambio)*100).toString();
        this.cantidadEnvio= (parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount)/100).toString();//this.listaremesa.cantidadEnvio;
        this.cantidadrecibir= (parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.destinationPrincipalAmout)/100).toString();//this.listaremesa.cantidadRecibir;
        this.comision= (parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.charges)/100).toString();//((parseFloat(this.listaremesa.comision)/2)*10).toString();
        this.cantidadtotal= (parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.grossTotalAmount)/100).toString();//(parseFloat(this.listaremesa.cantidadTotal)+(parseFloat(this.comision))).toString();
        this.tipoCambioMoneda.destination_principal_amount=(parseInt(this.cantidadEnvio)*100).toString();
        this.tipoCambioMoneda.recordingCountryoIsoCountryCode="PE";
        this.tipoCambioMoneda.recordingCountryoIsoCurrencyCode="USD";
        this.tipoCambioMoneda.destinationCountryIsoCountry=this.listaremesa.paisPago
     
        this.tipoCambioMoneda.originationCountryIsoCountry="PE";
        this.tipoCambioMoneda.originationCountryIsoCurrency="USD";
       
       
        
      
    
    }
     console.log("listaUbigeosInicio");
      this.api.getDasParametroUbigeo("").subscribe((response) => {
      this.cerrarCargando();
      console.log("listaUbigeos",this.lstubigeos);
      this.lstubigeos = response.detalle.ubigeos;

    });
    console.log("listaUbigeosFin");

    this.api.getDasParametroUbigeo(this.codep)
      .subscribe((response) => {
        this.cerrarCargando();
        this.lstubigeosprovincia =response.detalle.ubigeos&&response.detalle.ubigeos.filter(
          (e) => e.codUbigeo === this.codprov
        );
      });
    this.api.getDasParametroUbigeo(this.codprov).subscribe((response) => {
      this.cerrarCargando();
      this.lstubigeosdistritos = response.detalle.ubigeos&&response.detalle.ubigeos.filter(
        (e) => e.codUbigeo === this.coddist
      );
    });
    //RZNTRNS
    this.api.getDasParametro('MOTIVO').subscribe((response) => {
      this.cerrarCargando();
      this.lstmotivo = response.detalle.parametros;
    });
    this.api.getDasParametro('ORIGEN').subscribe((response) => {
      this.cerrarCargando();
      this.lstOrigenFondo = response.detalle.parametros;
    });
    //RELACRB
    this.api.getDasParametro('RELACRB').subscribe((response) => {
      this.cerrarCargando();
      this.lstRelacionDestinatario = response.detalle.parametros;
    });
    this.api.getDasParametro('OCUPACION').subscribe((response) => {
      this.cerrarCargando();
      this.lstocupacion = response.detalle.parametros;
    });     

    this.api.getPaises().subscribe(response =>{
      this.cerrarCargando();

      this.lstPaisNacimiento =response.detalle.paises;     
    });

    this.api.getDasParametro('sexo').subscribe((response) => {
      this.cerrarCargando();
      this.lstsexo = response.detalle.parametros;

    });
      this.api.getDasParametro('PEP').subscribe((response) => {
      this.cerrarCargando();
      this.lstpep = response.detalle.parametros;
    });
    this.api.getDasParametro('codpais').subscribe((response) => {
      this.cerrarCargando();
      this.lstcodPais = response.detalle.parametros;
    });
    const cliente = this.clienteBean.clienteResponse.detalle.Cliente;
    //
    this.cerrarCargando();   
  }

  

onVaciar(){
        this.cantidadrecibir="";
        this.comision="";
        this.cantidadtotal="";
        this.comision="";
         this.listaremesa.tipoCambio="";
}
  onMonedaPais(){
    this.tipoCambioMoneda.destinationCountryIsoCurrency="";
    this.listaremesa.tipoCambio="";
    this.estado="";
    this.cantidadrecibir="";
    this.comision="";
    this.cantidadtotal="";
  this.Paismoneda =  JSON.parse(<string>sessionStorage.getItem("PaisesWU"));
    var moneda=this.paisesWU.countrY_LONG.split('/')
   
    if(moneda[1].toString()=="MX"){
      this.api.getEstadosWU('MX').subscribe((resp)=>{
       this.lstEstados=resp.detalle.Detalle;  
       this.isDisableEst=true;
      });
     }
     if(moneda[1].toString()=="CA"){
      this.api.getEstadosWU('CA').subscribe((resp)=>{
       this.lstEstados=resp.detalle.Detalle; 
       this.isDisableEst=true;     
      });
     }
     if(moneda[1].toString()=="US"){
      this.api.getEstadosWU('US').subscribe((resp)=>{
       this.lstEstados=resp.detalle.Detalle; 
       this.isDisableEst=true;     
      });
     }
   
      this.isDisableEst=false;
    


          for (let i = 0; i < 2; i++) {
            switch (i) {
              case 1:
                this.lstMoneda =this.Paismoneda&&this.Paismoneda.filter(
                  (e) => e.isO_COUNTRY_CD === moneda[1].toString());                
                break;             
            }                       
          } 
      
     
  }

  onTipoCambio(){
    if(this.cantidadEnvio==undefined || this.cantidadEnvio==""){
      this.onModalAdvertencia("Falta Completar el Campo Importe");
      return ;
  }  
  if(this.paisesWU.countrY_LONG==undefined|| this.paisesWU.countrY_LONG==""){
    this.onModalAdvertencia("Falta Seleccionar País de Pago")
  }  
  if(this.tipoCambioMoneda.destinationCountryIsoCurrency==undefined || this.tipoCambioMoneda.destinationCountryIsoCurrency==""){
    this.onModalAdvertencia("Falta Seleccionar moneda de Envío");
    return ;
  }else
    if(this.estado.length>=3){
      var estado =this.estado.split('/');
    }else{
      this.estado=""+"/"+""
      var estado =this.estado.split('/');
    }
  

    //if (localStorage.getItem('ListaRemesaEnvio') == null) {
    this.tipoCambioMoneda.destination_principal_amount=(parseInt(this.cantidadEnvio)*100).toString();
    this.tipoCambioMoneda.payoutLocationCode=estado[0].toString();
    this.tipoCambioMoneda.payoutLocationCity=estado[1].toString();
    var paismoneda=this.paisesWU.countrY_LONG.split('/');

    this.tipoCambioMoneda.recordingCountryoIsoCountryCode="PE";
    this.tipoCambioMoneda.recordingCountryoIsoCurrencyCode="USD";
    this.tipoCambioMoneda.destinationCountryIsoCountry=paismoneda[1].toString()
   // this.tipoCambioMoneda.destinationCountryIsoCurrency="USD";
    this.tipoCambioMoneda.originationCountryIsoCountry="PE";
    this.tipoCambioMoneda.originationCountryIsoCurrency="USD";
    //      
      this.tipoCambioMoneda.nroRef=this.clienteBean.clienteResponse.detalle.Cliente.nroDocumento;
    //
    if(paismoneda[1].toString()=="VE" && this.tipoCambioMoneda.destinationCountryIsoCurrency.toString()=="USD" && parseInt(this.cantidadEnvio)>=201 ){
     this.onModalAdvertencia("Monto Maximo de 200 USD");   
    
   }
    this.api.postTipoCambio(this.tipoCambioMoneda).subscribe(res=>{
      localStorage.setItem("dinero",JSON.stringify(res));      
    //  try{    
      var cantidadrecibir=parseFloat( res.detalle.RespuestaWU.destinationPrincipalAmout)/100;
      this.cantidadrecibir=cantidadrecibir.toString();
      this.comision=(parseFloat( res.detalle.RespuestaWU.charges)/100).toString();
      this.igv="0";//(cantidadrecibir*0.18).toString();
      this.cantidadtotal=(parseFloat(res.detalle.RespuestaWU.grossTotalAmount)/100).toString(); 
      if(parseInt(this.cantidadtotal)>=999){
        this.onModalAdvertencia("La cantidad No puede ser mayor a 999  por cliente");
        var cantidadrecibir=0;
        this.cantidadrecibir="";
        this.comision="";
        this.cantidadtotal="";
        return;
      } 
      this.listaremesa.tipoCambio=res.detalle.RespuestaWU.exchange_rate;
      this.listaremesa.comision=(parseFloat( res.detalle.RespuestaWU.charges)/100).toString();
      this.detalleTipoCambio= <DetalleTipoCambio> JSON.parse(<string>localStorage.getItem("dinero"));
      localStorage.setItem("ListaMoneda",JSON.stringify(this.lstMoneda));   
      
     //  }catch(e){
      //  this.onModalAdvertencia("Moneda de pago no autorizado");
       //}
    })
   // }
  }


    onChangeUbigeoDepartamento(value: string) {
      this.api.getDasParametroUbigeo(value).subscribe((response) => {
        this.lstubigeosprovincia = response.detalle.ubigeos;
      });
    }
    onChangeUbigeoProvincia(valor1: string) {
      this.api.getDasParametroUbigeo(valor1).subscribe((response) => {
        this.lstubigeosdistritos = response.detalle.ubigeos;      
      });
    }
  
    validarpuesto(valor2 :string){
      if(valor2=="Domestic Helper"||valor2=="Prof Svc Practitioner"||valor2=="Religious/Church Servant"||valor2=="Retired"||valor2=="Security Guard"||valor2=="Driver"||valor2=="Prof Svc Practitioner"||valor2=="Housewife/Child Care"||valor2=="Domestic Helpe"||valor2=="Laborer-Agriculture"||valor2=="Laborer-Construction"||valor2=="Laborer-Manufacturing"||valor2=="Laborer- Oil/Gas/Mining"||valor2=="Non-profit/Volunteer"||valor2=="Unemployed"||valor2=="Student"||valor2=="Self-Employed"){
        this.clienteBean.clienteResponse.detalle.Cliente.puestoCargo == "";   
        this.lstpuestocargo=[];
    }else{
      this.api.getDasParametro('PUESTO').subscribe((response) => {
        this.cerrarCargando();
        
        this.lstpuestocargo = response.detalle.parametros;
      });  
      }
    }
    
    
    validarCasillas() {  

      var outString1 = this.clienteBean.clienteResponse.detalle.Cliente.direccion1.replace(/[`~!@#$%^&*()_|+\-=?;:'"°,áéíóú.<>\{\}\[\]\\\/]/gi, '');
      var outString = outString1.replace(/[ñ\{\}\[\]\\\/]/gi, 'n');
    this.clienteBean.clienteResponse.detalle.Cliente.direccion1=outString;
  

    const fecha=this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision==null?this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision:this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision;
    const fechacad=this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad==null?this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad:this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad;
    localStorage.setItem("añoemi", JSON.stringify(fecha));
    localStorage.setItem("añocad", JSON.stringify(fechacad));
    const dt =(JSON.parse(<string>localStorage.getItem('añoemi')))
    const dt2 =(JSON.parse(<string>localStorage.getItem('añocad')))
    const number = moment(new Date()).format('YYYYMMDD');//(this.datepipe.transform(new Date(),"dd-MM-yyyy"));
    const number2 = moment(new Date()).format('YYYYMMDD');//(this.datepipe.transform(new Date(),"dd-MM-yyyy"))
    localStorage.setItem("añoact", JSON.stringify(number));
    localStorage.setItem("añocad", JSON.stringify(number2));
    const fact=(JSON.parse(<string>localStorage.getItem('añoact')));
    const fact2=(JSON.parse(<string>localStorage.getItem('añocad')));
    localStorage.removeItem("añocad");
    const numberemi = moment(dt).format('YYYYMMDD');
    const numbercad = moment(dt2).format('YYYYMMDD');
      const parsfemi= numberemi.split('-');
      const parsfact = fact.split('-');
    
      if(parseInt(fact) > parseInt(numbercad)){
        this.onModalAdvertencia("La fecha de caducidad no puede ser menor a la fecha actual");
        return false;
      }  
      if(parseInt(fact) < parseInt(numberemi)){
        this.onModalAdvertencia("La fecha de emisión no puede ser mayor a la fecha actual");
        return false;
      }    
   
           
      if(this.cantidadtotal==undefined || this.cantidadtotal==""){
          this.onModalAdvertencia("Favor de Cotizar");
          return false;
      }
      if(this.cantidadrecibir==undefined || this.cantidadrecibir==""){
        this.onModalAdvertencia("Favor  de cotizar");
        return false;
      }    
      if(this.tipoCambioMoneda.destinationCountryIsoCurrency==undefined || this.tipoCambioMoneda.destinationCountryIsoCurrency==""){
        this.onModalAdvertencia("Falta Seleccionar moneda de Envío");
        return false;
      }
      if(this.paisesWU.countrY_LONG==undefined|| this.paisesWU.countrY_LONG==""){
        this.onModalAdvertencia("Falta Seleccionar País de Pago")
      }
        if(this.clienteBean.clienteResponse.detalle.Cliente.pep == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.pep == "")){
        this.onModalAdvertencia("Falta ingresar PEP");   
      
        return false;
      }
      if(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono=='123456789'||this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono=='987654321' ||
      this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono=='000000000'){
        this.onModalAdvertencia("Ingrese correctamente el Número de Celular");
      
        return false;
      }  
      if(this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == "")){
        this.onModalAdvertencia("Falta ingresar Ocupación");   
      
        return false;
      }     if(this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad == "")){
        this.onModalAdvertencia("Falta ingresar fecha caducidad")
        return false;
      }     if(this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision == "")){
        this.onModalAdvertencia("Falta ingresar fecha Emisión")
        return false;
      }    if(this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacimiento == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacimiento == "")){
        this.onModalAdvertencia("Falta ingrese País De Nacimiento")
        return false;
      }     if(this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == "")){
        this.onModalAdvertencia("Falta ingresar Ocupación")
        return false;
      } if(this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacionalidad==undefined || this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacionalidad==""){

      } /*   if(this.clienteBean.clienteResponse.detalle.Cliente.puestoCargo == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.puestoCargo == "")){
        this.onModalAdvertencia("Falta ingresar Cargo/Pesto")
        return false;
      }  */  if(this.listaremesa.motivoTransaccion == undefined || (this.listaremesa.motivoTransaccion == "")){
        this.onModalAdvertencia("Falta ingresar Motivo de Transacción")
        return false;
      }    if(this.listaremesa.origenFondos == undefined || (this.listaremesa.origenFondos == "")){
        this.onModalAdvertencia("Falta ingresar Origen de Fondos")
        return false;
      }    if(this.clienteBean.clienteResponse.detalle.Cliente.sexo == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.sexo == "")){
        this.onModalAdvertencia("Falta ingresar sexo")
        return false;
      }    if(this.listaremesa.relacionDestinatario == undefined || (this.listaremesa.relacionDestinatario == "")){
        this.onModalAdvertencia("Falta ingresar Relación Destinatario")
        return false;
      }    if(this.clienteBean.clienteResponse.detalle.Cliente.codPaisResidencia == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codPaisResidencia == "")){
        this.onModalAdvertencia("Falta ingresar País de Residencia")
        return false;
      }    if(this.clienteBean.clienteResponse.detalle.Cliente.direccion1 == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.direccion1 == "")){
        this.onModalAdvertencia("Falta ingresar Dirección")
        return false;
      }    if(this.clienteBean.clienteResponse.detalle.Cliente.departamento.length<2 || (this.clienteBean.clienteResponse.detalle.Cliente.departamento == undefined)){
        this.onModalAdvertencia("Falta ingresar Departamento")
        return false;
      }    if(this.clienteBean.clienteResponse.detalle.Cliente.provincia == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.provincia == "")){
        this.onModalAdvertencia("Falta ingresar Provincia")
        return false;
      }    if(this.clienteBean.clienteResponse.detalle.Cliente.distrito == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.distrito == "")){
        this.onModalAdvertencia("Falta ingresar Distrito")
        return false;
      }    
        /*if(this.clienteBean.clienteResponse.detalle.Cliente.codPostal == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codPostal == "")){
        this.onModalAdvertencia("Falta ingresar Código Postal")
        return false;
      }*/    if(this.clienteBean.clienteResponse.detalle.Cliente.email == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.email == "")){
        this.onModalAdvertencia("Falta ingresar Email")
        return false;
      }   if( this.isDisableEst==true && this.estado==undefined){
        this.onModalAdvertencia("Escoja un Estado")
        return false;
      }    
  
     if(!this.isDisableTel){
      if(this.clienteBean.clienteResponse.detalle.Cliente.codTelfPais == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codTelfPais == "")){
        this.onModalAdvertencia("Falta ingresar Código Teléfono ")
        return false;
      }     if(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil == "")){
        this.onModalAdvertencia("Falta ingresar Número de Teléfono")
        return false;
      } if(!this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil.match(/^\d{9}$/)||(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil=='123456789')||
      (this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil=='000000000')){
        this.onModalAdvertencia("Ingrese correctamente el Número de Teléfono");                 
        return false;
      }  
     }
  
    if(!this.isDisablePhon){
         if(this.clienteBean.clienteResponse.detalle.Cliente.codMovilPais == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codMovilPais == "")){
          this.onModalAdvertencia("Falta ingresar Código Móvil ")
          return false;
        }   if(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono == "")){
          this.onModalAdvertencia("Falta ingresar Número de Celular")
          return false;
        }if(!this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono.match(/^\d{9}$/)){
          this.onModalAdvertencia("Ingrese correctamente el Número de Celular.");                 
          return false;
        }
      }
      ///
      var email=this.clienteBean.clienteResponse.detalle.Cliente.email.split('@');    
      if(email[1].indexOf(".") == -1){
        this.onModalAdvertencia("Ingresar un email valido")
          return false;
      }
      ////////
   
      return true;
    }


    oncheckvalidarTel(param:string){
      if(param=="Y"){
      //  this.isDisableTel?this.isDisableTel=false:this.isDisableTel=true;      
        this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil="";
        this.clienteBean.clienteResponse.detalle.Cliente.codTelfPais="";

      }
    } 
    
    oncheckvalidadPhone(param:string){
  
      if(param=="Y"){ 
        this.isDisablePhon?this.isDisablePhon=false:this.isDisablePhon=true;      
        this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono="";
        this.clienteResponse.detalle.Cliente.codMovilPais="";
      }  
    }
    
    onDisableRb(param: string) {
      if (param == 'val') {
     
        this.validar?this.validar=false:this.validar=true;  
      }
    }
    
   
  
    onDisablePa(param:string){
     if (param=="Y"){
       this.isDisableOP?this.isDisableOP=false:this.isDisableOP=true;
       this.clienteBean.clienteResponse.detalle.Cliente.departamento="0";
       this.clienteBean.clienteResponse.detalle.Cliente.provincia="0";
       this.clienteBean.clienteResponse.detalle.Cliente.distrito="0";
       this.clienteBean.clienteResponse.detalle.Cliente.codPostal="00000";
     }  
    }
    imputchange(){
     var dato=this.tipoCambioMoneda.destination_principal_amount;
     this.cantidadrecibir=dato;
    }
     
validarLista(){

  
      //crear interface de DATOSENVIO
////
const cliente = this.clienteBean.clienteResponse.detalle.Cliente;
let fechaCad= this.datepipe.transform(cliente.fechaCaducidad,"yyyy-MM-dd");
this.cliente.fechaCaducidad=fechaCad?.toString();
let fechaEm=this.datepipe.transform(cliente.fechaEmision,"yyyy-MM-dd");
this.cliente.fechaEmision=fechaEm?.toString();
this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad = fechaCad?.toString();
this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision = fechaEm?.toString();
//this.listaremesa.idRemesa =
this.listaremesa.monedaEnvio =
  this.tipoCambioMoneda.originationCountryIsoCurrency;
const mond=this.paisesWU.countrY_LONG.split('/');
 const paisenv=this.tipoCambioMoneda.destinationCountryIsoCurrency+"/"+mond[1].toString();
this.listaremesa.paisPago =paisenv;
//this.paisesWU.countrY_LONG;//Pais de Destino?

this.listaremesa.tipoCambio =
  (this.detalleTipoCambio.detalle.RespuestaWU.exchange_rate).toString()==null?(this.detalleTipoCambio.detalle.RespuestaWU.exchange_rate).toString():(this.detalleTipoCambio.detalle.RespuestaWU.exchange_rate).toString();
this.listaremesa.cantidadEnvio =//
  (parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount)/100).toString()!=null?(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount)/100).toString():(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount)/100).toString();
this.listaremesa.cantidadRecibir =
(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount)/100).toString()!=null?(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount)/100).toString():(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.originatorsPrincipalAmount)/100).toString();

//this.listaremesa.comision = ((0.20*parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.charges))/100).toString();//preguntar de donde se calcaular  ///Existe 2 campos en comision.Preungat ivan
this.listaremesa.igv ="0";//(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.destinationPrincipalAmout)/100).toString();//calcular
this.listaremesa.itf = '0'; 
this.listaremesa.cantidadTotal =
(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.grossTotalAmount)/100).toString()!=null?(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.grossTotalAmount)/100).toString():(parseFloat(this.detalleTipoCambio.detalle.RespuestaWU.grossTotalAmount)/100).toString();//
this.listaremesa.idCliente = this.cliente.idCliente;

 
//
this.listaremesa.nombreDestino ="";
this.listaremesa.apellidoPatDestino ="";
this.listaremesa.apellidoMatDestino ="";
//
this.listaremesa.motivoTransaccion = this.listaremesa.motivoTransaccion;
  
this.listaremesa.origenFondos = 
  this.listaremesa.origenFondos;
this.listaremesa.relacionDestinatario =
this.listaremesa.relacionDestinatario
this.listaremesa.estado = 'EW';
this.listaremesa.creadoPor = 'Banco Azteca Fronend';   


  } 
//////
    onCrearCliente() {
      if(this.validar==true){
      // Actualizar Datos
      const cucho = this.validarCasillas()
      this.validarLista();
      if (cucho){      
      localStorage.removeItem("ClienteBeanEnvioTranslado");    
      localStorage.setItem("ClienteBeanEnvioTranslado", JSON.stringify(this.clienteBean));
      localStorage.setItem("ListaRemesaEnvio",JSON.stringify(this.listaremesa))            
      this.router.navigate(["/envio-translado-informacion-beneficiario"]);  
      if(this.estado!=null){
        localStorage.setItem("estado",JSON.stringify(this.estado));
      }    

      }
    } else{
      this.onModalAdvertencia("Validar Usuario y marcar Casilla")
    }
    }
  
}