import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Router, ActivatedRoute, ParamMap, Params} from '@angular/router';

import { JsBase } from '../../../core/base/JsBase';
import {MatDialog} from '@angular/material/dialog';
import { DetalleLogin, PaisesWU, Token } from 'src/app/core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-remesas',
  templateUrl: './remesas.component.html',
  styleUrls: ['./remesas.component.sass']
})
export class RemesasComponent extends JsBase implements OnInit {
     token: Token={} as Token;
  rutaActiva: any;
  lstCambioMoneda:Array<PaisesWU>=[];
  detalleLogin:DetalleLogin={}as DetalleLogin;
  connection:signalR.HubConnection;
  
  constructor(private api: ApiService,private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);

   
    //this.route.queryParams.subscribe(params => {
      
    //  this.token = params['request'];    
  //});
   
   }






  ngOnInit(): void {

  localStorage.removeItem("ClienteBeanPagoTranslado");
  localStorage.removeItem("MTCNLista");
  localStorage.removeItem("MTCNListaWU");
  localStorage.removeItem("remesadatos");
  localStorage.removeItem("confirmaremesa");
  localStorage.removeItem("ClienteBeanEnvioTranslado");
  localStorage.removeItem("DetalleWu");
  localStorage.removeItem("estado");
  localStorage.removeItem("dinero");
  localStorage.removeItem("añoemi");
  localStorage.removeItem("añoact");
  localStorage.removeItem("año");
  localStorage.removeItem("ListaMoneda");
  localStorage.removeItem("ListaRemesaEnvio");

  }

 
  onEnviarTransferencia(){
    this.router.navigate(['/envio-translado-busqueda']);
  }

  onPagarTransferencia(){
    this.router.navigate(['/pago-translado-busqueda']);
  }



  
}
