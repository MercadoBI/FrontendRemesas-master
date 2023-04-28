import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JsBase } from '../../../core/base/JsBase';
import { Router } from '@angular/router';
import { ClienteBean, DetalleEnvio, DetalleLogin, ListaMTCResponse, PaisesWU, RemesaTabla, ReqremesaCliente} from 'src/app/core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-informacion-beneficiario',
  templateUrl: './informacion-beneficiario.component.html',
  styleUrls: ['./informacion-beneficiario.component.sass'],
  providers: [DatePipe]
})


export class InformacionBeneficiarioComponent extends JsBase  implements OnInit {
  lstCambioMoneda:Array<PaisesWU>=[];
  listaMTCResponse:ListaMTCResponse ={}as ListaMTCResponse;
  listaremesa: RemesaTabla = {} as RemesaTabla;
  reqremesaCliente: ReqremesaCliente = {} as ReqremesaCliente;
  clienteBean: ClienteBean = {} as ClienteBean;
  detalleEnvio:DetalleEnvio={
    sender:{
    
    },
    receiver:{

    },
    financials:{

    },
    paymentDetails:{

    }
  }as DetalleEnvio;
  detalleLogin : DetalleLogin ={}as DetalleLogin;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    private datepipe:DatePipe
  ) { 
    super(dialog);
  }



  ngOnInit(): void {
    
  //
  this.lstCambioMoneda= JSON.parse(<string>sessionStorage.getItem("PaisesWU"));
 


    this.listaremesa= <RemesaTabla> JSON.parse(<string>localStorage.getItem("ListaRemesaEnvio"));
    if (localStorage.getItem('ClienteBeanEnvioTranslado') != null) {
      this.clienteBean = <ClienteBean>(
        JSON.parse(<string>localStorage.getItem('ClienteBeanEnvioTranslado'))
      ); }
  if (localStorage.getItem('DetalleWu') != null) {
        this.detalleEnvio = <DetalleEnvio>(
          JSON.parse(<string>localStorage.getItem('DetalleWu'))
        ); 
      this.listaMTCResponse.beneNameFirst=this.detalleEnvio.receiver.givenNameReceiver;
      this.listaMTCResponse.beneNameLast1=this.detalleEnvio.receiver.paternalNameReceiver;
      this.listaMTCResponse.beneNameLast2=this.detalleEnvio.receiver.maternalNameReceiver;
      
      }
  



  }
  validarCasillas(){
    if(this.listaMTCResponse.beneNameFirst==undefined  || this.listaMTCResponse.beneNameFirst==""){
      this.onModalAdvertencia("Ingrese  el nombre de Beneficiario");
      return false;
    }
    if(this.listaMTCResponse.beneNameLast1==undefined  || this.listaMTCResponse.beneNameLast1==""){
      this.onModalAdvertencia("Ingrese  el Apellido Paterno de Beneficiario");
      return false;
    }
    if(this.listaMTCResponse.beneNameLast2==undefined  || this.listaMTCResponse.beneNameLast2==""){
      this.onModalAdvertencia("Ingrese  el Apellido Materno de Beneficiario");
      return false;
    }
    return true;
  }
    
  async onactualizarcliente() {


   
      this.listaremesa.nombreDestino =this.listaMTCResponse.beneNameFirst;
    this.listaremesa.apellidoPatDestino =this.listaMTCResponse.beneNameLast1;
    this.listaremesa.apellidoMatDestino =this.listaMTCResponse.beneNameLast2;
    localStorage.removeItem("ListaRemesaEnvio");
    localStorage.setItem("ListaRemesaEnvio",JSON.stringify(this.listaremesa));
      // Actualizar Datos
      const cucho = this.validarCasillas()
      if (cucho){    
        const remesaTabla = this.listaremesa;
        remesaTabla.idCliente=this.clienteBean.clienteResponse.detalle.Cliente.idCliente;
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
   
        //const envia_recibe_remesa=this.ReqEnviarecibeRemesa        
        this.detalleEnvio.sender.idType=this.clienteBean.clienteResponse.detalle.Cliente.tipoDocumento;
        this.detalleEnvio.sender.areYouAPEPRelativeOrFriendSender=this.clienteBean.clienteResponse.detalle.Cliente.pep;
        this.detalleEnvio.sender.genderSender=this.clienteBean.clienteResponse.detalle.Cliente.sexo;
        if(this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre!=""){
          this.detalleEnvio.sender.givenNameSender=this.clienteBean.clienteResponse.detalle.Cliente.nombre + " "+this.clienteBean.clienteResponse.detalle.Cliente.segundoNombre;
        }else{
          this.detalleEnvio.sender.givenNameSender=this.clienteBean.clienteResponse.detalle.Cliente.nombre;
        }        
        this.detalleEnvio.sender.paternalNameSender=this.clienteBean.clienteResponse.detalle.Cliente.apellidoPaterno;
        this.detalleEnvio.sender.maternalNameSender=this.clienteBean.clienteResponse.detalle.Cliente.apellidoMaterno;
        this.detalleEnvio.sender.typeNameSender=this.clienteBean.clienteResponse.detalle.Cliente.flagOtroPais;
         this.detalleEnvio.sender.currentAddrLine1Sender=this.clienteBean.clienteResponse.detalle.Cliente.direccion1;      
        const provincia= this.clienteBean.clienteResponse.detalle.Cliente.provincia.split('/');
        this.detalleEnvio.sender.currentAddrLine2Sender=provincia[1].toString();
        const distrito=this.clienteBean.clienteResponse.detalle.Cliente.distrito.split('/');
        this.detalleEnvio.sender.currentCitySender=distrito[1].toString();
        const departamento=this.clienteBean.clienteResponse.detalle.Cliente.departamento.split('/');
        this.detalleEnvio.sender.currentStateNameSender=departamento[1].toString();
        this.detalleEnvio.sender.currentPostalCodeSender=this.clienteBean.clienteResponse.detalle.Cliente.codPostal;
        const PaisResidencia = this.clienteBean.clienteResponse.detalle.Cliente.codPaisResidencia.split('/');
        this.detalleEnvio.sender.countryCodeSender=PaisResidencia[0].toString();
        this.detalleEnvio.sender.addressCurrencyCodeSender="USD";
        this.detalleEnvio.sender.addressCountryNameSender=PaisResidencia[1];
        this.detalleEnvio.sender.compDetailsIdNumberSender=this.clienteBean.clienteResponse.detalle.Cliente.nroDocumento;
        this.detalleEnvio.sender.detailsIdIssueDateSender=this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision!=null?this.clienteBean.clienteResponse.detalle.Cliente.fechaEmision:toString();
        this.detalleEnvio.sender.detailsIdExpirationDateSender=this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad!=null?this.clienteBean.clienteResponse.detalle.Cliente.fechaCaducidad:toString();
        this.detalleEnvio.sender.detailsDateOfBirthSender=this.clienteBean.clienteResponse.detalle.Cliente.fechaNacimiento!=null?this.clienteBean.clienteResponse.detalle.Cliente.fechaNacimiento:toString();
        this.detalleEnvio.sender.detailsOccupationSender=this.clienteBean.clienteResponse.detalle.Cliente.ocupacion;
        this.detalleEnvio.sender.currentEmailAddressSender=this.clienteBean.clienteResponse.detalle.Cliente.email;
        this.detalleEnvio.sender.contactPhoneSender= this.clienteBean.clienteResponse.detalle.Cliente.numeroTelefono;
        this.detalleEnvio.sender.contactPhone=this.clienteBean.clienteResponse.detalle.Cliente.numeroTelfMovil;
        const paisNacimiento=this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacimiento.split('/');
       console.log(this.detalleEnvio.sender.contactPhone);
        this.detalleEnvio.sender.compDetailsIdPlaceOfIssueSender=this.clienteBean.clienteResponse.detalle.Cliente.paisDocumento;
        this.detalleEnvio.sender.countryOfBirthSender=paisNacimiento[1].toString();
        const paisNacionalidad= this.clienteBean.clienteResponse.detalle.Cliente.codPaisNacimiento.split('/');
        this.detalleEnvio.sender.nationalitySender=paisNacimiento[1].toString();
        this.detalleEnvio.sender.relationshipToReceiverSender=remesa.relacionDestinatario;
        this.detalleEnvio.sender.mobileCountryCodeSender=this.clienteBean.clienteResponse.detalle.Cliente.codMovilPais;
        this.detalleEnvio.sender.detailsTransactionReasonSender=this.listaremesa.motivoTransaccion;
  //activarPEP    //this.detalleEnvio.sender.areYouAPEPRelativeOrFriendSender=
        this.detalleEnvio.sender.tempAddrLine1Sender=this.clienteBean.clienteResponse.detalle.Cliente.direccion1;
        this.detalleEnvio.sender.tempAddrLine2Sender=provincia[1].toString();
        this.detalleEnvio.sender.tempCitySender=distrito[1].toString();
        this.detalleEnvio.sender.tempStateCodeSender=departamento[1].toString();
        this.detalleEnvio.sender.tempPostalCodeSender=this.clienteBean.clienteResponse.detalle.Cliente.codPostal;
        this.detalleEnvio.sender.tempCountrySender=PaisResidencia[1].toString();
        this.detalleEnvio.sender.employmentPositionLevelSender=this.clienteBean.clienteResponse.detalle.Cliente.puestoCargo;
        this.detalleEnvio.sender.emailSender=this.clienteBean.clienteResponse.detalle.Cliente.email;
        this.detalleEnvio.receiver.givenNameReceiver=remesa.nombreDestino;
        this.detalleEnvio.receiver.paternalNameReceiver=remesa.apellidoPatDestino;
        this.detalleEnvio.receiver.maternalNameReceiver=remesa.apellidoMatDestino;
        const paisPago= remesa.paisPago.split('/');
        this.detalleEnvio.paymentDetails.expLocationStateCodeReceiver="";//remesa.paisPago;        
        this.detalleEnvio.paymentDetails.expLocationCityReceiver="";
        this.detalleEnvio.paymentDetails.recordingCountrycodeReceiver=PaisResidencia[0].toString();
        this.detalleEnvio.paymentDetails.recordingCurrencycodeReceiver="USD";
        this.detalleEnvio.paymentDetails.destinationCountrycodeReceiver=paisPago[1].toString();
        this.detalleEnvio.paymentDetails.destinationCurrencycodeReceiver=paisPago[0].toString();
        this.detalleEnvio.paymentDetails.originatigCountrycodeReceiver=PaisResidencia[0].toString();
        this.detalleEnvio.paymentDetails.originatigCurrencycodeReceiver="USD";
        this.detalleEnvio.financials.originatorsPrincipalAmountReceiver=(parseInt(remesa.cantidadEnvio.toString())*100).toString();//check
        this.detalleEnvio.financials.destinationPrincipalAmountReceiver=(parseInt(remesa.cantidadEnvio.toString())*100).toString();
        //
      const m =this.lstCambioMoneda&&this.lstCambioMoneda.filter(
        (e) => e.isO_COUNTRY_CD === this.detalleEnvio.paymentDetails.destinationCountrycodeReceiver&&e.currencY_CD===this.detalleEnvio.paymentDetails.destinationCurrencycodeReceiver);
      //

 this.detalleEnvio.paisdestino=m[0].countrY_LONG.toString();
    
     /*   this.detalleEnvio.financials.originatorsPrincipalAmountReceiver=
        (parseFloat (remesa.cantidadEnvio)+ parseFloat(remesa.comision)).toString();*/
        await  this.api.postActualizarRemesa(this.reqremesaCliente).subscribe((resp)=>{
          this.abrirCargando();
          if(resp.estado=="1"){
            this.onModalAdvertencia(resp.mensaje)
            this.cerrarCargando();
            return;
          }
           if (resp.estado=="0"){
         // this.detalleEnvio.financials.originatorsPrincipalAmountReceiver= 
        //  (parseFloat (remesa.cantidadEnvio)+ parseFloat(remesa.comision)*100).toString();
          this.detalleEnvio.idremesa=resp.detalle.idremesa;    
        localStorage.setItem("DetalleWu",JSON.stringify(this.detalleEnvio));
        
        const estado= JSON.parse(<string>localStorage.getItem('estado'))
        if(estado!=null){
        const state=estado.split('/');
        this.detalleEnvio.paymentDetails.expLocationStateCodeReceiver=state[0].toString();
        this.detalleEnvio.paymentDetails.expLocationCityReceiver=state[1].toString();
        }
        console.log(JSON.stringify(this.detalleEnvio));
          this.api.postValidarUsuario(this.detalleEnvio).subscribe((res) => {
             //desde qui
             
               if  (res.estado!=="0"){
                 this.onModalAdvertencia(res.mensaje)
                 this.cerrarCargando();
                 return
               }else{
               localStorage.setItem("DetalleWu",JSON.stringify(this.detalleEnvio));
               this.cerrarCargando();
               this.router.navigate(['/envio-translado-informacion-beneficiario-resultado']);
              
               }
             });

           }else{
             this.onModalAdvertencia("Hubo un Error al validar en envio",);
             this.cerrarCargando();
             return
           }
        }
         )
      
      
      }

    
  }
 

    
  
  
  
}
