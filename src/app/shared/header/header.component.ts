import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { JsBase } from '../../core/base/JsBase';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';
import { DetalleLogin, Token } from 'src/app/core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { RemesasComponent } from 'src/app/modules/inicio/remesas/remesas.component';
import { ModalConfirmacionDialog } from 'src/app/shared/modal/modal-confirmacion/modal-confirmacion.dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SignalrServiceService } from 'src/app/service/signalr-service.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})

export class HeaderComponent extends JsBase implements OnInit {
  detalleLogin: DetalleLogin = {} as DetalleLogin;
  connection: signalR.HubConnection;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = undefined;
  title = 'angular-idle-timeout';
  nombreUsuario: string;
  usuarioLogin: string;
  token: string;
  messages: signalR.Subject<string> = new signalR.Subject();
  nameCookie = `SA-RMS-${ environment.env }`;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private idle: Idle,
    private keepalive: Keepalive,
    public dialog: MatDialog,
    private api: ApiService,
    private signalrServiceService: SignalrServiceService,
    private cookieService: CookieService
  ) {
    super(dialog);

    // this.route.queryParams.subscribe((params) => {
    //   this.token = params['request'];
    // });
    //const token: string = cookieService.get(this.nameCookie);
    //if (token) {
    //  this.token = token;
    //}
    this.token = 'T3Ms6jsksLhNoV%2FjWB7y5gmAz6ITimumJhOsMdPcmxctrTlPVssBHmUQWKWvlkR2MFKwTJunVucZE258pPxspCFfByOnQlVJCw4B%2F1PzvNycqkerGX%2F2FAQvvnAa8A32jqUE6Vfq%2BNuHpAvonUspa0ywjqj3YrMvb2U71W9wt6vicgAUhLsVJYqRPbI4nS2Z1mQ6dngRINt3LzjrSM29NGSjJa8lxjtmGvzXemapug3vvd3atbb635y%2FRiNc25Janw7lpiU4i1TOPV3e3TpQaCdz0tLGPLfduUqHf9GjnXw1aaKmRMQME7%2BdZXSIwsNFv68%2B0cV1ritwAjX9H%2Fj05%2BIBqV1eUJ75F3um7L7%2FjgGl%2B3cHefk4HDBk0pPczakkbvVC9tgS00CkTkTgGp5k8%2BLMJtaDDx%2BeNo1nNOKzgJvL0ZbCQitYkd5AblGcAM0fMlHmllpFLp%2FKJzfBV8VDKF%2FeBKiWjuEyOgt0qpLmbm0S4huiwC0C';

    idle.setIdle(900);

    idle.setTimeout(15);

    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Ya no está inactivo.';

      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Se Acabo el Tiempo!';
      this.timedOut = true;
      localStorage.removeItem('token');
      localStorage.removeItem('token-expiracion');
      sessionStorage.removeItem('UsuarioLogin');
      window!.top!.close;
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'esta de vuelta!';
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });

    keepalive.interval(120);
    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));
    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  /*async inicio() {
    const ReqSesion = {
      UserLogin: this.detalleLogin.detalle.estado.usuarioLogin,
      CodeSatelite: this.detalleLogin.detalle.estado.codigoSatelite,
      SessionId: this.detalleLogin.detalle.estado.sessionId,
    };
    try {
      await this.connection.start();
      const sessionid = this.detalleLogin.detalle.estado.sessionId;
      console.log('SignalR Connected.');
      await this.connection.invoke('AddToGroup', sessionid);
      await this.connection.on('revokesession', (sessionRequest) => {
        console.log('>>>>>>>>>>>' + sessionRequest);
        localStorage.removeItem('token');
        localStorage.removeItem('token-expiracion');
        sessionStorage.removeItem('UsuarioLogin');
        this.api.postLogoutSatelite(ReqSesion).subscribe(async (res) => {});
        window!.top!.close();
      });
    } catch (err) {
      setTimeout(this.inicio, 5000);
    }
  }*/

  ngOnInit(): void {
    //
    this.signalrServiceService.initiateSignalrConnection();

    //this.start();
    ///

    //this.connection = new signalR.HubConnectionBuilder()
    // .withUrl("https://wsprodazure.abdigital.com:7443/servicesignalprd/hubcnx?apikey=27705C82-FCD3-43FC-AAB0-53E03569A342",{
    // .withUrl(
    //'https://serviciosazure.abdigital.com:7443/servicesignalbazqa/hubcnx?apikey=7B11D7F3-A747-4EBD-AC93-CC352E15HYTT9',
    // {
    // skipNegotiation: true,
    // transport: signalR.HttpTransportType.WebSockets
    // }
    // )
    // .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
    // .configureLogging(signalR.LogLevel.Information)
    //  .build();

    /* this.inicio();
    this.connection.onclose(async () => {
      await this.inicio();
    });*/
    ///
    this.api.getPaisesWU().subscribe((response) => {
      const cadena_corregida = JSON.stringify(response.detalle.Detalle).replace(
        /\\\\/g,
        '\\'
      );
      sessionStorage.setItem('PaisesWU', cadena_corregida);
    });

    // const uri='https://prodazure.abdigital.com:8443/WebLoginPrd';
    const uri = 'https://desarrolloazure.abdigital.com:8443/WebLoginQa/Menu';
    // const uri = 'https://prodazure.abdigital.com:8443/WebLoginPrd/Menu';
    if (sessionStorage.getItem('UsuarioLogin') != null) {
      this.detalleLogin = <DetalleLogin>(
        JSON.parse(<string>sessionStorage.getItem('UsuarioLogin'))
      );
      if (this.detalleLogin.detalle?.estado.nombreRol != 'Cajero') {
        this.onModalAdvertencia('Usuario no Autorizado');
        window.location.href = uri;
        return;
      }
    }

    if (sessionStorage.getItem('UsuarioLogin') == null) {
      const token = this.token;
      if (!token) {
        window.location.href = uri;
        return;
      }

      this.api.postPostLogin(this.token).subscribe(async (res) => {
        if (res == null) {
          window.location.href = uri;
          return;
        }
        if (res.detalle.estado.nombreRol != 'Cajero') {
          window.location.href = uri;
          return;
        }
        this.cookieService.set(this.nameCookie, '', { expires: new Date(), domain: '.abdigital.com', path: '/'});
        this.nombreUsuario = res.detalle.estado?.nombreUsuario;
        this.usuarioLogin = res.detalle.estado?.usuarioLogin;
        sessionStorage.setItem('UsuarioLogin', JSON.stringify(res));
        // this.detalleLogin.detalle.estado.nombreUsuario=res.detalle.estado.nombreUsuario;
      });
    }
    //this.detalleLogin = <DetalleLogin>JSON.parse(<string>sessionStorage.getItem("UsuarioLogin"));
    //this.nombreUsuario= this.detalleLogin.detalle.estado?.nombreUsuario;
  }

  ngAfterViewInit() {
    this.detalleLogin = <DetalleLogin>(
      JSON.parse(<string>sessionStorage.getItem('UsuarioLogin'))
    );
    this.nombreUsuario = this.detalleLogin?.detalle?.estado.nombreUsuario;
    this.usuarioLogin = this.detalleLogin?.detalle?.estado.usuarioLogin;
    this.cdref.detectChanges();
  }

  cerrarsession() {
    this.router.navigate(['/inicio']);
   /* this.detalleLogin = <DetalleLogin>(
      JSON.parse(<string>sessionStorage.getItem('UsuarioLogin'))
    );
    this.onModalConfirmacion('Desea Cerrar Sessión');*/
  }

  async start() {}

  onModalConfirmacion(contenido: string) {
    const dialogRef = this.dialog.open(ModalConfirmacionDialog, {
      width: '400px',
      disableClose: true,
      data: {
        titulo: 'Confirmación',
        contenido: contenido,
        btnCancelar: { visible: true, texto: 'Cancelar' },
        btnAceptar: { visible: true, texto: 'Continuar' },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        ///
        /**
         *
         *
         */
        const sessionId = {
          UserLogin: this.detalleLogin.detalle?.estado.usuarioLogin,
          CodeSatelite: this.detalleLogin.detalle?.estado.codigoSatelite,
          SessionId: this.detalleLogin.detalle?.estado.sessionId,
        };
        localStorage.removeItem('token');
        localStorage.removeItem('token-expiracion');
        sessionStorage.removeItem('UsuarioLogin');
        this.api.postLogoutSatelite(sessionId).subscribe(async (res) => {});
        window!.top!.close();
        //
      }
    });
  }
}
