import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Pantallas
import { LoginComponent } from './modules/inicio/login/login.component';
import { RemesasComponent } from './modules/inicio/remesas/remesas.component';

import { BusquedaComponent as BusquedaEnvioTransladoComponent } from './modules/envio-translado/busqueda/busqueda.component';
import { ValidacionComponent as  ValidacionEnvioTransladoComponent } from './modules/envio-translado/validacion/validacion.component';
import { InformacionTransferenciaComponent as  InformacionTransferenciaEnvioTransladoComponent } from './modules/envio-translado/informacion-transferencia/informacion-transferencia.component';
import { InformacionBeneficiarioComponent as InformacionBeneficiarioEnvioTransladoComponent} from './modules/envio-translado/informacion-beneficiario/informacion-beneficiario.component';
import { InformacionBeneficiarioResultadoComponent as InformacionBeneficiarioResultadoEnvioTransladoComponent } from './modules/envio-translado/informacion-beneficiario-resultado/informacion-beneficiario-resultado.component';

import { BusquedaComponent as BusquedaPagoTransladoComponent } from './modules/pago-transferencia/busqueda/busqueda.component';
import { ValidacionComponent as  ValidacionPagoTransladoComponent } from './modules/pago-transferencia/validacion/validacion.component';
import { InformacionComponent as InformacionPagoTransladoComponent } from './modules/pago-transferencia/informacion/informacion.component';
import { DocumentoIdentidadComponent as  DocumentoIdentidadPagoTransladoComponent } from './modules/pago-transferencia/documento-identidad/documento-identidad.component';
import { DireccionBeneficiarioComponent as DireccionBeneficiarioPagoTransladoComponent } from './modules/pago-transferencia/direccion-beneficiario/direccion-beneficiario.component';
import { FormaPagoComponent as FormaPagoPagoTransladoComponent } from './modules/pago-transferencia/forma-pago/forma-pago.component';

//shared
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ModalCargandoDialog } from './shared/modal/modal-cargando/modal-cargando.dialog';
import { ModalConfirmacionDialog } from './shared/modal/modal-confirmacion/modal-confirmacion.dialog';
import { ModalErrorDialog } from './shared/modal/modal-error/modal-error.dialog';
import { ModalInformacionDialog } from './shared/modal/modal-informacion/modal-informacion.dialog';
import { ModalAdvertenciaDialog } from './shared/modal/modal-advertencia/modal-advertencia.dialog';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', 
    redirectTo: '/inicio', 
    pathMatch: 'full' 
  },
  /*{
    path: 'login',
    component: LoginComponent
  },*/
  {
    path: 'inicio',
    component: RemesasComponent
  },
  {
    path: 'envio-translado-busqueda',
    component: BusquedaEnvioTransladoComponent
  },
  {
    path: 'envio-translado-validacion',
    component: ValidacionEnvioTransladoComponent
  },
  {
    path: 'envio-translado-informacion-transferencia',
    component: InformacionTransferenciaEnvioTransladoComponent
  },
  {
    path : 'envio-translado-informacion-beneficiario' ,
    component: InformacionBeneficiarioEnvioTransladoComponent
  },
  {
    path : 'envio-translado-informacion-beneficiario-resultado' ,
    component: InformacionBeneficiarioResultadoEnvioTransladoComponent
  },
  {
    path: 'pago-translado-busqueda',
    component: BusquedaPagoTransladoComponent
  },
  {
    path: 'pago-translado-validacion',
    component: ValidacionPagoTransladoComponent
  },
  {
    path: 'pago-translado-informacion',
    component: InformacionPagoTransladoComponent
  },
  {
    path: 'pago-translado-documento-identificacion',
    component: DocumentoIdentidadPagoTransladoComponent 
  },
  {
    path: 'pago-translado-forma-pago',
    component: FormaPagoPagoTransladoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ 
    BusquedaEnvioTransladoComponent,
    BusquedaPagoTransladoComponent,
    ValidacionEnvioTransladoComponent,
    ValidacionPagoTransladoComponent,
    InformacionTransferenciaEnvioTransladoComponent,  
    DocumentoIdentidadPagoTransladoComponent,
    InformacionBeneficiarioEnvioTransladoComponent,
    InformacionBeneficiarioResultadoEnvioTransladoComponent,
    DireccionBeneficiarioPagoTransladoComponent,
    FormaPagoPagoTransladoComponent,
    InformacionPagoTransladoComponent,
    LoginComponent,
    RemesasComponent,
    HeaderComponent,
    FooterComponent,

    ModalCargandoDialog,
    ModalConfirmacionDialog,
    ModalAdvertenciaDialog,
    ModalInformacionDialog,
    ModalErrorDialog
]