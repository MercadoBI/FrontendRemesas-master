import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {
  DasParametroResponse,
  DasParametroUbigeoResponse,
  ClienteResponse,
  ClienteRequest,
  ValidarListaNegraRequest,
  ValidarListaNegraResponse,
  Cliente,
  MTCParametro,
  MTCResponse,
  ReqremesaCliente,
  RemesaResponse,
  ReqEnviarecibeRemesa,
  ResEnviarecibeRemesa,
  RemesaTabla,
  RespCloseOut,
  DasParametroPais,
  ResponseReceiverMoneySearch,
  DetallePaisesWU,
  TipoCambioMoneda,
  DetalleTipoCambio,
  TipoCambio,
  DetalleEnvio,
  Detallerespvalidacionwu,
  Token,
  DetalleLogin,
  DetalleCloseOut,
  DetalleEstadosWU,
} from '../core/interfaces/JsInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiRest = environment.apiRest.host;
  apiExt = environment.apiExt.host;

  constructor(private http: HttpClient) {}

  getDasParametroUbigeo(
    codigo: string
  ): Observable<DasParametroUbigeoResponse> {
    return this.http.get<DasParametroUbigeoResponse>(
      this.apiRest + '/DasParametro/Ubigeo/' + codigo
    );
  }

  getDasParametro(tipo: string): Observable<DasParametroResponse> {
    return this.http.get<DasParametroResponse>(
      this.apiRest + '/DasParametro/' + tipo
    );
  }

  getCliente(clienteRequest: ClienteRequest): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(
      this.apiRest +
        '/Cliente/' +
        clienteRequest.tipoDocumento +
        '/' +
        clienteRequest.numeroDocumento
    );
  }
  getRemesaId(id: string): Observable<RemesaTabla> {
    return this.http.get<RemesaTabla>(
      this.apiRest + '/Remesa/obtenerPorid?id=' + id
    );
  }

  postValidarListaNegra(
    validarListaNegraRequest: ValidarListaNegraRequest
  ): Observable<ValidarListaNegraResponse> {
    return this.http.post<ValidarListaNegraResponse>(
      this.apiRest + '/Cliente/validarlistanegra',
      validarListaNegraRequest
    );
  }
  postCrearCliente(clienteRequest: Cliente): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(
      this.apiRest + '/Cliente/crearCliente',
      clienteRequest
    );
  }

  postValidarMTC(MTCRequest: MTCParametro): Observable<MTCResponse> {
    return this.http.post<MTCResponse>(
      this.apiRest + '/Remesa/buscarPagoRia',
      MTCRequest
    );
  }

  putActualizarCliente(clienteRequest: Cliente): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(
      this.apiRest + '/Cliente/actualizarCliente',
      clienteRequest
    );
  }

  postActualizarRemesa(
    reqremesaCliente: ReqremesaCliente
  ): Observable<RemesaResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<RemesaResponse>(
      this.apiRest + '/Remesa/crearRemesa',
      reqremesaCliente,
      { headers: headers }
    );
  }
  postEnviaRecibeRemesa(
    reqEnviarecibeRemesa: ReqEnviarecibeRemesa
  ): Observable<ResEnviarecibeRemesa> {
    return this.http.post<ResEnviarecibeRemesa>(
      this.apiRest + '/Remesa/externo/EnviaRecibeRemesa',
      reqEnviarecibeRemesa
    );
  }
  getPaises(): Observable<DasParametroPais> {
    return this.http.get<DasParametroPais>(
      this.apiRest + '/DasParametro/Paises'
    );
  }
  getPaisesBT(): Observable<DasParametroPais> {
    return this.http.get<DasParametroPais>(
      this.apiRest + '/DasParametro/PaisesBT'
    );
  }

  postValidarMTCNWU(
    MTCRequest: MTCParametro
  ): Observable<ResponseReceiverMoneySearch> {
    return this.http.post<ResponseReceiverMoneySearch>(
      this.apiRest + '/Remesa/externo/BuscarPagoWU',
      MTCRequest
    );
  }

  getPaisesWU(): Observable<DetallePaisesWU> {
    return this.http.get<DetallePaisesWU>(
      this.apiRest + '/Remesa/externo/WUListarPaises'
    );
  }
  getEstadosWU(_estado: string): Observable<DetalleEstadosWU> {
    return this.http.get<DetalleEstadosWU>(
      this.apiRest + '/Remesa/externo/EstadosMXyCA?estado=' + _estado
    );
  }

  postTipoCambio(
    _TipoCambioMoneda: TipoCambioMoneda
  ): Observable<DetalleTipoCambio> {
    return this.http.post<DetalleTipoCambio>(
      this.apiRest + '/Remesa/externo/ServicioTipoCambio',
      _TipoCambioMoneda
    );
  }
  postValidarUsuario(
    _detalleEnvio: DetalleEnvio
  ): Observable<Detallerespvalidacionwu> {
    return this.http.post<Detallerespvalidacionwu>(
      this.apiRest + '/Remesa/externo/ValidarEnvioPagoWU',
      _detalleEnvio
    );
  }
  postPostLogin(_token: string): Observable<DetalleLogin> {
    return this.http.get<DetalleLogin>(
      this.apiRest + '/RsaHelper?token=' + _token
    );
  }
  postLogout(_detalleCloseOut: DetalleCloseOut): Observable<RespCloseOut> {
    let headers = new HttpHeaders();
    /*prod */
  //  headers = headers.append('ApiKey', '82FF2B93-D3F6-4E4D-B01C-357F07191258');
   /*QA */
   headers = headers.append('ApiKey', 'A82HHHF2-A945-43BA-9186-48E0D8416A38');
    return this.http.post<RespCloseOut>(
      this.apiExt + '/Signal/Logout',
      _detalleCloseOut,
      { headers: headers }
    );
  }
  postLogoutSatelite(
    _detalleCloseOut: DetalleCloseOut
  ): Observable<RespCloseOut> {
    let headers = new HttpHeaders();
/* Prod */
  //  headers = headers.append('ApiKey', '82FF2B93-D3F6-4E4D-B01C-357F07191258');
  /*QA */
    headers = headers.append('ApiKey', 'A82HHHF2-A945-43BA-9186-48E0D8416A38');
    return this.http.post<RespCloseOut>(
      this.apiExt + '/Account/LogoutSatelite',
      _detalleCloseOut,
      { headers: headers }
    );
  }
}
