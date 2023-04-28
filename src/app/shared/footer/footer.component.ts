import { Component, OnInit } from '@angular/core';
import { JsBase } from '../../core/base/JsBase';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent extends JsBase implements OnInit {

  constructor( public dialog: MatDialog) { 
    super(dialog);
  } 

  ngOnInit(): void {
  }

}
