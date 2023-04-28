import { Component, OnInit } from '@angular/core';
import { JsBase } from '../../../core/base/JsBase';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent extends JsBase implements OnInit {

  hide = true;
  
  constructor( public dialog: MatDialog) { 
    super(dialog);
  } 

  ngOnInit(): void {
   
    localStorage.removeItem("ClienteBeanPagoTranslado");
    localStorage.removeItem("MTCNLista");
    localStorage.removeItem("remesadatos");
    localStorage.removeItem("confirmaremesa");
  }

}
