import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JsBase } from 'src/app/core/base/JsBase';
import {
  Cliente,
  ClienteBean,
  ClienteResponse,
  DasParametro,
  RemesaTabla,
  ReqremesaCliente,
  Ubigeos,
  validarListaMTCM,
  ReqEnviarecibeRemesa,
  Pep,
  DasParametroPais,  
  ResponseReceiverMoneySearch,
  Paises,
  PaisesWU,
  ReceiveMoneyPayRequest,
  DetalleLogin
} from 'src/app/core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';
import { DateAdapter } from '@angular/material/core';
import { coerceStringArray } from '@angular/cdk/coercion';
import * as moment from 'moment';


@Component({
  selector: 'app-documento-identidad',
  templateUrl: './documento-identidad.component.html',
  styleUrls: ['./documento-identidad.component.sass'],
  providers: [DatePipe],
})
export class DocumentoIdentidadComponent extends JsBase implements OnInit {
 
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
 
  lstpep:Array<DasParametro> = [];
  validar:boolean=false;
  isDisableOP: boolean = false;
  isDisableTel: boolean= false;
  isDisablePhon:boolean=false;
  lstPaisResidencia:Array<Paises>=[{ codigo:"PE",pais:"Peru"}] 
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

  ListaMTCN: validarListaMTCM = {} as validarListaMTCM;
  ReqEnviarecibeRemesa: ReqEnviarecibeRemesa = {} as ReqEnviarecibeRemesa;
  reqremesaCliente: ReqremesaCliente = {} as ReqremesaCliente;
  cliente: Cliente = {} as Cliente;
  responseReceiverMoneySearch :ResponseReceiverMoneySearch={}as ResponseReceiverMoneySearch;
  remesaTabla: RemesaTabla = {} as RemesaTabla;

  listaremesa: RemesaTabla = {
    monedaEnvio: '',
  } as RemesaTabla;
  detalleLogin:DetalleLogin={}as DetalleLogin;
  listaremesaWU: ReceiveMoneyPayRequest = {} as ReceiveMoneyPayRequest;

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
    this.clienteBean.clienteResponse.detalle.Cliente.codPostal="00000";
    this.abrirCargando();
    if (localStorage.getItem('MTCNListaWU') != null) {
      this.responseReceiverMoneySearch = <ResponseReceiverMoneySearch>(
        JSON.parse(<string>localStorage.getItem('MTCNListaWU'))            
      );          
      }
    if (localStorage.getItem('ClienteBeanPagoTranslado') != null) {
      this.clienteBean = <ClienteBean>(
        JSON.parse(<string>localStorage.getItem('ClienteBeanPagoTranslado'))
      );     
      //
        const tel=this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono;
        const cel=this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil;
        if(tel!=null && cel ==''){
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
      if(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono==''){          
        this.oncheckvalidarTel('Y'); 
        this.isDisableTel=true;      
       }
      // 


      var departamento=this.clienteBean.clienteResponse.detalle.Cliente.departamento;
      departamento==null?departamento=" ":departamento;
      if(departamento!=null){
        this.clienteBean.clienteResponse.detalle.Cliente.departamento=" ";
      }  if (departamento.length>=2) {
        this.codep =
        departamento.split("/", 1).toString();
        this.clienteBean.clienteResponse.detalle.Cliente. departamento= departamento;
     this.codprov =
        this.clienteBean.clienteResponse.detalle.Cliente.provincia.split("/", 1).toString();
      this.coddist =
        this.clienteBean.clienteResponse.detalle.Cliente.distrito.split("/", 1).toString();
      } 
    }else {
      this.router.navigate(['/pago-translado-validacion']);
    }

    this.api.getDasParametroUbigeo('').subscribe((response) => {
      this.cerrarCargando();
      this.lstubigeos = response.detalle.ubigeos;
    });
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
     this.api.getDasParametro('PEP').subscribe((response) => {
      this.cerrarCargando();
      this.lstpep = response.detalle.parametros;

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
 
    this.api.getDasParametro('codpais').subscribe((response) => {
      this.cerrarCargando();
      this.lstcodPais = response.detalle.parametros;
    });
    const cliente = this.clienteBean.clienteResponse.detalle.Cliente;
    this.ListaMTCN = <validarListaMTCM>(
      JSON.parse(<string>localStorage.getItem('MTCNLista'))
    );
    if((localStorage.getItem("MTCNListaWU")) == null)
    {
    this.listaremesa.idRemesa = 
      this.ListaMTCN.mtcResponse.detalle.detalle.response.pin.toString();
    this.listaremesa.monedaEnvio =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneCurrency;
    this.listaremesa.paisPago =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.custCountry;
    this.listaremesa.tipoCambio =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneCurrency;
    this.listaremesa.cantidadEnvio =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneAmount;
    this.listaremesa.cantidadRecibir =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneAmount;
    this.listaremesa.comision = '0.00';
    this.listaremesa.igv = '0';
    this.listaremesa.itf = '0';
    this.listaremesa.cantidadTotal =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneAmount;
    this.listaremesa.idCliente = cliente.idCliente;
    this.listaremesa.nombreDestino =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneNameFirst;
    this.listaremesa.apellidoPatDestino =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneNameLast1;
    this.listaremesa.apellidoMatDestino =
      this.ListaMTCN.mtcResponse.detalle.detalle.response.beneNameLast2;
    this.listaremesa.motivoTransaccion =
      this.clienteBean.clienteResponse.detalle.Cliente.moTransaccion;
   /* this.listaremesa.origenFondos = 
      this.clienteBean.clienteResponse.detalle.Cliente.orFondos;*/
    this.listaremesa.relacionDestinatario =
      this.clienteBean.clienteResponse.detalle.Cliente.reDestinatario;
    this.listaremesa.estado = 'R';
    this.listaremesa.creadoPor = 'Banco Azteca Fronend';    
    //this.listaremesa.creadoFecha="";
    }
    if((localStorage.getItem("MTCNListaWU")) != null)
    {      
      this.listaremesa.idRemesa =this.responseReceiverMoneySearch.mtcn.toString();
      this.listaremesa.monedaEnvio =this.responseReceiverMoneySearch.paymentDetails.originalDestinationCountryCurrency.isoCode.currencyCode;
      this.listaremesa.paisPago =this.ListaMTCN.mtcResponse.detalle.detalle.response.custCountry;
      this.listaremesa.tipoCambio =this.responseReceiverMoneySearch.sender.address.countryCode.isoCode.countryCode;
      this.listaremesa.cantidadEnvio =(this.responseReceiverMoneySearch.financials.principalAmount/100).toString();
      this.listaremesa.cantidadRecibir =(this.responseReceiverMoneySearch.financials.principalAmount/100).toString();
      if(localStorage.getItem('MTCNListaWU') != null){
        this.responseReceiverMoneySearch = <ResponseReceiverMoneySearch>(JSON.parse(<string>localStorage.getItem('MTCNListaWU')));
        this.listaremesa.comision= ((this.responseReceiverMoneySearch.financials.charges/100)* 0.13).toString();
     }else{
      this.listaremesa.comision= "2";//0.8 entero para ria.//0.13% PagosWU//0.13% enviosWU               
     }
      this.listaremesa.igv = '0';
      this.listaremesa.itf = '0'; 
      this.listaremesa.cantidadTotal =((parseFloat(this.listaremesa.comision)+(this.responseReceiverMoneySearch.financials.principalAmount/100)).toFixed(2)).toString();
      console.log(this.listaremesa.comision+' +'+ this.responseReceiverMoneySearch.financials.principalAmount/100+'='+ this.listaremesa.cantidadTotal)
      this.listaremesa.idCliente = cliente.idCliente;
      this.listaremesa.nombreDestino =this.responseReceiverMoneySearch.receiver.name.givenName;
      this.listaremesa.apellidoPatDestino =this.responseReceiverMoneySearch.receiver.name.paternalName
      this.listaremesa.apellidoMatDestino =this.responseReceiverMoneySearch.receiver.name.maternalName;
      this.listaremesa.motivoTransaccion =
        this.clienteBean.clienteResponse.detalle.Cliente.moTransaccion;
   /*   this.listaremesa.origenFondos = 
    this.clienteBean.clienteResponse.detalle.Cliente.orFondos;*/
      this.listaremesa.relacionDestinatario =
      this.clienteBean.clienteResponse.detalle.Cliente.reDestinatario;
      this.listaremesa.estado = 'W';
      this.listaremesa.creadoPor = 'Banco Azteca Fronend'
          //////ListaWU
        
    }
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
    
    if(this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision == "")){
      this.onModalAdvertencia("Falta ingresar fecha Emisión")
      return false;
    }
    if(this.clienteBean.clienteResponse.detalle.Cliente.pep == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.pep == "")){
      this.onModalAdvertencia("Falta ingresar PEP");   
    
      return false;
    }
    if(this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == "")){
      this.onModalAdvertencia("Falta ingresar Ocupación");   
    
      return false;
    }     if(this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad == "")){
      this.onModalAdvertencia("Falta ingresar fecha caducidad")
      return false;
    }         if(this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacimiento == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacimiento == "")){
      this.onModalAdvertencia("Falta ingresar País de Nacimiento")
      return false;
    }     if(this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.ocupacion == "")){
      this.onModalAdvertencia("Falta ingresar Ocupación")
      return false;
    }   if(this.clienteBean.clienteResponse.detalle.Cliente.moTransaccion== undefined || (this.clienteBean.clienteResponse.detalle.Cliente.moTransaccion == "")){
      this.onModalAdvertencia("Falta ingresar Motivo de Transacción")
      return false;
    }   /* if(this.clienteBean.clienteResponse.detalle.Cliente.orFondos== undefined || (this.clienteBean.clienteResponse.detalle.Cliente.orFondos == "")){
      this.onModalAdvertencia("Falta ingresar Origen de Fondos")
      return false;
    }  */  if(this.clienteBean.clienteResponse.detalle.Cliente.sexo == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.sexo == "")){
      this.onModalAdvertencia("Falta ingresar sexo")
      return false;
    }    if(this.clienteBean.clienteResponse.detalle.Cliente.reDestinatario == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.reDestinatario == "")){
      this.onModalAdvertencia("Falta ingresar Relación Destinatario")
      return false;
    }    if(this.clienteBean.clienteResponse.detalle.Cliente.codPaisResidencia == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codPaisResidencia == "")){
      this.onModalAdvertencia("Falta ingresar País de Residencia")
      return false;
    }    if(this.clienteBean.clienteResponse.detalle.Cliente.direccion1 == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.direccion1 == "")){
      this.onModalAdvertencia("Falta ingresar Dirección")
      return false;
    }   if(this.clienteBean.clienteResponse.detalle.Cliente.departamento.length<2 || (this.clienteBean.clienteResponse.detalle.Cliente.departamento == undefined)){
      this.onModalAdvertencia("Falta ingresar Departamento")
      return false;
    }    if(this.clienteBean.clienteResponse.detalle.Cliente.provincia == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.provincia == "")){
      this.onModalAdvertencia("Falta ingresar Provincia")
      return false;
    }    if(this.clienteBean.clienteResponse.detalle.Cliente.distrito == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.distrito == "")){
      this.onModalAdvertencia("Falta ingresar Distrito")
      return false;
    }    if(this.clienteBean.clienteResponse.detalle.Cliente.sexo == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.sexo == "")){
      this.onModalAdvertencia("Falta ingresar sexo")
      return false;
    }    
    /*if(this.clienteBean.clienteResponse.detalle.Cliente.codPostal == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codPostal == "")){
      this.onModalAdvertencia("Falta ingresar Código Postal")
      return false;
    } */   
    if(this.clienteBean.clienteResponse.detalle.Cliente.email == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.email == "")){
      this.onModalAdvertencia("Falta ingresar Email")
      return false;
    }    

   if(!this.isDisableTel){
    if(this.clienteBean.clienteResponse.detalle.Cliente.codTelfPais == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codTelfPais == "")){
      this.onModalAdvertencia("Falta ingresar Código Teléfono ")
      return false;
    }     if(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono == "")){
      this.onModalAdvertencia("Falta ingresar Número de Teléfono")
      return false;
    } if(!this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono.match(/^\d{9}$/)){
      this.onModalAdvertencia("Ingrese correctamente el Número de Teléfono");                 
      return false;
    } 
   }

  if(!this.isDisablePhon){
       if(this.clienteBean.clienteResponse.detalle.Cliente.codMovilPais == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.codMovilPais == "")){
        this.onModalAdvertencia("Falta ingresar Código Móvil ")
        return false;
      }   if(this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil == undefined || (this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil == "")){
        this.onModalAdvertencia("Falta ingresar Número de Celular")
        return false;
      }if(!this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil.match(/^\d{9}$/)){
        this.onModalAdvertencia("Ingrese correctamente el Número de Celular");                 
        return false;
      }
    }
    return true;
  }
  
  oncheckvalidarTel(param:string){ 
    if(param=="Y"){
     // this.isDisableTel?this.isDisableTel=false:this.isDisableTel=true;      
      this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono="";
      this.clienteBean.clienteResponse.detalle.Cliente.codTelfPais="";
    }
  }
  
  oncheckvalidadPhone(param:string){

    if(param=="Y"){
      
    //  this.isDisablePhon?this.isDisablePhon=false:this.isDisablePhon=true;      
      this.clienteResponse.detalle.Cliente.numeroTelfMovil="";
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

    async onactualizarcliente() {
      // Actualizar Datos 
      if(this.validar==true){
    
      const cucho = this.validarCasillas()
      if (cucho){    
        this.listaremesa.relacionDestinatario=this.clienteBean.clienteResponse.detalle.Cliente.reDestinatario;
        this.listaremesa.motivoTransaccion=this.clienteBean.clienteResponse.detalle.Cliente.moTransaccion;
        const remesaTabla = this.listaremesa;
        this.reqremesaCliente.remesatabla = remesaTabla;
        const cliente = this.clienteBean.clienteResponse.detalle.Cliente;
        cliente.actualizadoFecha = '';
        cliente.creadoFecha = '';     
        let fechaCad= this.datepipe.transform(cliente.fechaCaducidad,"yyyy-MM-dd");
        cliente.fechaCaducidad=fechaCad?.toString();
        let fechaEm=this.datepipe.transform(cliente.fechaEmision,"yyyy-MM-dd");
        cliente.fechaEmision=fechaEm?.toString();
        const remesa = this.listaremesa;
        this.reqremesaCliente.cliente = cliente;
        this.reqremesaCliente.remesatabla = remesa;
       
        const envia_recibe_remesa=this.ReqEnviarecibeRemesa
         await this.api.postActualizarRemesa(this.reqremesaCliente).subscribe((res) => {       
          if  (res.estado!=="0"){
            this.onModalAdvertencia(res.mensaje)
            return
          }else{
          localStorage.setItem('ClienteBeanPagoTranslado', JSON.stringify(this.clienteBean));
          localStorage.setItem('remesadatos', JSON.stringify(res));
          this.router.navigate(["/pago-translado-forma-pago"]);
          }
        });
      }
    }else{
      this.onModalAdvertencia("Validar Usuario y marcar Casilla")
    }
    } 
}
