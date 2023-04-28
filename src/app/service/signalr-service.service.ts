import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as signalR from '@microsoft/signalr';
import { DetalleLogin } from 'src/app/core/interfaces/JsInterfaces';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class SignalrServiceService {
  API_URL_HUB: string = environment.apiExt.urlhub;
  private authLocalStorageSession = `UsuarioLogin`;
  private session = this.getSessionLocalStorage();

  constructor(private api: ApiService) {}

  public initiateSignalrConnection(): Promise<any> {
   

    return new Promise(async (resolve, reject) => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${this.API_URL_HUB}`)
        .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
        .configureLogging(signalR.LogLevel.Information)
        .build();

      const ReqSesion = {
        UserLogin: this.session.detalle?.estado.usuarioLogin,
        CodeSatelite: this.session.detalle?.estado.codigoSatelite,
        SessionId: this.session.detalle?.estado.sessionId,
      };
      await connection.start();
      await connection.invoke(
        'AddToGroup',
        this.session.detalle.estado.sessionId
      );
      await connection.on('revokesession', (sessionRequest) => {
        console.log('>>>>>>>>>>>' + sessionRequest);
        //localStorage.removeItem('token');
        //localStorage.removeItem('token-expiracion');
        sessionStorage.removeItem('UsuarioLogin');
        this.api.postLogoutSatelite(ReqSesion).subscribe(async (res) => {});
        window!.top!.close();
      });
    });
  }
  getSessionLocalStorage(): any {

    try {
      const sessionData = <DetalleLogin>(
        JSON.parse(<string>sessionStorage.getItem('UsuarioLogin'))
      );
      return sessionData;
    } catch (error) {
      return undefined;
    }
  }
}
