export interface DasParametroResponse {
  estado: string;
  mensaje: string;
  detalle: {
    parametros: Array<DasParametro>;
  };
}
export interface RiaSearch {
  PIN: string;
}

export interface DasParametroUbigeoResponse {
  estado: string;
  mensaje: string;
  detalle: DetalleUbigeos;
}
export interface DetalleUbigeos {
  ubigeos: Array<Ubigeos>;
}

export interface Ubigeos {
  codUbigeo: string;
  departamento: string;
  provincia: string;
  distrito: string;
}

export interface ClienteBean {
  clienteRequest: ClienteRequest;
  clienteResponse: ClienteResponse;
}

export interface ClienteRequest {
  tipoDocumento: string;
  numeroDocumento: string;
}

export interface ClienteResponse {
  estado: string;
  mensaje: string;
  detalle: DetalleCliente;
}

export interface ValidarListaNegraBean {
  validarListaNegraRequest: ValidarListaNegraRequest;
  validarListaNegraResponse: ValidarListaNegraResponse;
}

export interface ValidarListaNegraRequest {
  paisDocumentoId: string;
  tipoDocumentoId: string;
  numeroDocumento: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  nombreEmpresa: string;
  fechaNacimiento?: string;
  codigoUsuario: string;
}

export interface ValidarListaNegraResponse {
  estado: string;
  mensaje: string;
  detalle: Detalle;
}
export interface Detalle {
  ListaNegraResponse: ListaNegraResponse;
}
export interface RemesaResponse {
  estado: string;
  mensaje: string;
  detalle: detalle;
}
export interface detalle {
  idremesa: string;
}
export interface ListaNegraResponse {
  existeEnLista: string;
  btoutreq: Btoutreq;
}
export interface Btoutreq {
  numero: number;
  estado: string;
  servicio: string;
  requerimiento: string;
  fecha: Date;
  hora: string;
  canal: string;
}

export interface DetalleCliente {
  Cliente: Cliente;
}
export interface RemesaTabla {
  idTransferencia: string;
  idRemesa: string;
  monedaEnvio: string;
  paisPago: string;
  tipoCambio: string;
  cantidadEnvio: string;
  cantidadRecibir: string;
  comision: string;
  igv: string;
  itf: string;
  cantidadTotal: string;
  idCliente: string;
  nombreDestino: string;
  apellidoPatDestino: string;
  apellidoMatDestino: string;
  motivoTransaccion: string;
  origenFondos: string;
  relacionDestinatario: string;
  estado: string;
  creadoPor: string;
  creadoFecha: string;
  actualizadoPor: string;
}
export interface ReqremesaCliente {
  remesatabla: RemesaTabla;
  cliente: Cliente;
}

export interface Cliente {
  idCliente: string;
  tipoDocumento: string;
  nroDocumento: string;
  paisDocumento: string;
  nombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombreEmpresa: string;
  fechaNacimiento?: string;
  fechaCaducidad?: string;
  fechaEmision?: string;
  codPaisNacimiento: string;
  codPaisNacionalidad: string;
  codPaisResidencia: string;
  sexo: string;
  ocupacion: string;
  puestoCargo: string;
  direccion1: string;
  flagOtroPais: string;
  codPostal: string;
  departamento: string;
  provincia: string;
  distrito: string;
  email: string;
  flagTelefono: string;
  codTelfPais: string;
  numeroTelefono: string;
  flagTelfMovil: string;
  codMovilPais: string;
  numeroTelfMovil: string;
  creadoPor: string;
  creadoFecha: string;
  actualizadoPor: string;
  actualizadoFecha: string;
  moTransaccion: string;
  orFondos: string;
  reDestinatario: string;
  pep: string;
}

export interface DasParametro {
  estado: string;
  flag: number;
  idDasParametro: number;
  tipoParametro: string;
  valor1: string;
  valor2: string;
  valor3: string;
  valor4: string;
  valor5: string;
}
export interface Ubigeos {
  codUbigeo: string;
  departamento: string;
  provincia: string;
  distrito: string;
}

export interface MTCParametro {
  Pin: string;
}

export interface MTCResponse {
  detalle: DetalleError;
}

export interface DetalleError {
  detalle: ResponseCode;
}

export interface ResponseCode {
  response: ListaMTCResponse;
}

export interface ListaMTCResponse {
  transRefID: string;
  responseCode: string;
  beneNameFirst: string;
  beneNameLast1: string;
  beneNameLast2: string;
  beneAmount: string;
  beneCountry: string;
  custNameFirst: string;
  custNameLast1: string;
  custNameLast2: string;
  beneCurrency: string;
  pin: string;
  custCountry: string;
  custBeneRelationship: string;
  transferReason: string;
}

export interface validarListaMTCM {
  mtcParametro: MTCParametro;
  mtcResponse: MTCResponse;
}
export interface Pep {
  items: string;
  value: string;
}
export interface Moneda {
  item: string;
  value: string;
}
export interface ReqEnviarecibeRemesa {
  idremesa: string;
  envrec: string;
  sucursal: string;
  usuario: string;
  idremesadora: string;
  mdapag: string;
  impmdapag: string;
  impcomrem: string;
  impcombco: string;
  impitf: string;
  impigv: string;
}
export interface Erroresnegocio {
  btErrorNegocio: btErrorNegocio[];
}
export interface btErrorNegocio {
  codigo: string;
  descripcion: string;
  severidad: string;
}
export interface ResEnviarecibeRemesa {
  detalle: DetalleResponseRemesaConfirmar;
  estado: string;
  mensaje: string;
}
export interface DetalleResponseRemesaConfirmar {
  EnviaRecibeRemesasResponse: EnviaRecibeRemesasResponse;
}
export interface EnviaRecibeRemesasResponse {
  Btinreq: Btinreq;
  erroresnegocio: Erroresnegocio;
  Btoutreq: Btoutreq;
}
export interface Btinreq {
  Device: string;
  Usuario: string;
  Requerimiento: string;
  Canal: string;
  Token: string;
}

////INTERFACE WESTER UNION////////////////////////////
export interface ListamtcnWu {
  estado: string;
  mensaje: string;
  detalle: RespuestaWU;
}
export interface RespuestaWU {
  RespuestaWU: ResponseReceiverMoneySearch;
}

export interface ResponseReceiverMoneySearch {
  sender: Sender;
  receiver: Receiver;
  financials: Financials;
  paymentDetails: PaymentDetails;
  filingDate: string;
  filingTime: string;
  moneyTransferKey: string;
  payStatusDescription: string;
  mtcn: string;
  newMtcn: string;
  fusion: Fusion;
  wuNetworkAgentIndicator: any;
}

export interface ReceiveMoneyPayRequest {
  givenName: string;
  paternalName: string;
  maternalName: string;
  addrLine1: string;
  addrLine2: string;
  addrCity: string;
  addrState: string;
  addrPostalCode: string;
  idCountryOfIssue: string;
  idPlaceOfIssue: string;
  idNumber: string;
  idIssueDate: string;
  idExpirationDate: string;
  dateOfBirth?: string;
  occupation: string;
  transactionReason: string;
  detailAddrLine1: string;
  detailAddrLine2: string;
  detailCity: string;
  stateName: string;
  setailPostalCode: string;
  detailCountry: string;
  emailAddress: string;
  receiverContactPhone: string;
  countryOfBirth: string;
  nationality: string;
  relationshipToReceiverSender: string;
  ackFlag: string;
  receiverMobileCountryCode: string;
  mobilePhoneNumber: string;
  countryCode: string;
  employmentPositionLevel: string;
  email: string;
  phoneCountryCode: string;
  contactPhone: string;
  mobileCountryCode: string;
  nationalNumber: string;
  stateCode: string;
  city: string;
  detailCountryCode: string;
  detailCurrencyCode: string;
  detailCountryCode1: string;
  detailCurrencyCode1: string;
  originatingCity: string;
  exchangeRate: number;
  detailCountryCode2: string;
  detailCurrencyCode2: string;
  grossTotalAmount: number;
  payAmount: number;
  principalAmount: number;
  charges: number;
  tolls: number;
  moneyTransferKey: string;
  newMtcn: string;
  mtcn: string;
}

export interface Sender {
  name: Name;
  address: Address;
  contactPhone: string;
  mobilePhone: MobilePhone;
  mobileDetails: MobileDetails;
  cpfTaxId: string;
}

export interface Receiver {
  name: Name;
  address: Address;
  mobilePhone: MobilePhone;
  mobileDetails: MobileDetails;
}

export interface Financials {
  grossTotalAmount: number;
  payAmount: number;
  principalAmount: number;
  charges: number;
  tolls: number;
}

export interface PaymentDetails {
  expectedPayoutLocation: ExpectedPayoutLocation;
  destinationCountryCurrency: DestinationCountryCurrency;
  originatingCountryCurrency: OriginatingCountryCurrency;
  originalDestinationCountryCurrency: OriginalDestinationCountryCurrency;
}

export interface Name {
  givenName: string;
  paternalName: string;
  maternalName: string;
  nameType: string;
}

export interface IsoCode {
  countryCode: string;
  currencyCode: string;
}

export interface CountryCode {
  isoCode: IsoCode;
}

export interface Address {
  city: string;
  state: string;
  countryCode: CountryCode;
  stateZip: string;
  street: string;
}

export interface PhoneNumber {
  countryCode: string;
  nationalNumber: string;
}

export interface MobilePhone {
  phoneNumber: PhoneNumber;
}

export interface MobileDetails {
  cityCode: string;
  number: string;
}

export interface ExpectedPayoutLocation {
  stateCode: string;
  city: string;
}

export interface DestinationCountryCurrency {
  isoCode: IsoCode;
}

export interface OriginatingCountryCurrency {
  isoCode: IsoCode;
}

export interface OriginalDestinationCountryCurrency {
  isoCode: IsoCode;
}

export interface Fusion {
  fusionStatus: string;
}
export interface DetalleTipoCambio {
  estado: string;
  detalle: DetalleTip;
}
export interface DetalleTip {
  RespuestaWU: TipoCambio;
}

export interface TipoCambio {
  originatorsPrincipalAmount: string;
  destinationPrincipalAmout: string;
  grossTotalAmount: string;
  plusChargesAmount: string;
  payAmount: string;
  charges: string;
  exchange_rate: string;
}

export interface TipoCambioMoneda {
  destination_principal_amount: string;
  payoutLocationCode: string;
  payoutLocationCity: string;
  recordingCountryoIsoCountryCode: string;
  recordingCountryoIsoCurrencyCode: string;
  destinationCountryIsoCountry: string;
  destinationCountryIsoCurrency: string;
  originationCountryIsoCountry: string;
  originationCountryIsoCurrency: string;
  nroRef: string;
}

export interface DasParametroPais {
  detalle: DetallePaises;
}

export interface DetallePaises {
  paises: Array<Paises>;
}

export interface Paises {
  codigo: string;
  pais: string;
}

export interface DetalleEstadosWU {
  estado: string;
  mensaje: string;
  detalle: DetalleEstados;
}
export interface DetalleEstados {
  Detalle: Array<detalleEstadosWu>;
}
export interface detalleEstadosWu {
  statE_CODE: string;
  statE_NAME: string;
  city: string;
}

export interface DetallePaisesWU {
  detalle: DetallePaisesW;
}

export interface DetallePaisesW {
  Detalle: Array<PaisesWU>;
}
export interface PaisesWU {
  countrY_LONG: string;
  isO_COUNTRY_NUM_CD: string;
  isO_COUNTRY_CD: string;
  currencY_CD: string;
  disP_CURRENCY_CD: string;
  isO_CURRENCY_NUM_CD: string;
  currencY_NAME: string;
}
export interface Detallerespvalidacionwu {
  estado: string;
  mensaje: string;
  detalle: detaWUValudacion;
}
export interface detaWUValudacion {
  detalle: detaWUVal;
}
export interface detaWUVal {
  detalle: resValicacionWU;
}
export interface resValicacionWU {
  mtcn: string;
  newMtcn: string;
}

export interface DetalleEnvio {
  sender: sender;
  receiver: receiver;
  paymentDetails: paymentDetails;
  financials: financials;
  idremesa: string;
  paisdestino: string;
}
export interface DetalleCloseOut {
  SessionId: String;
  UserLogin: String;
  CodeSatelite: String;
}

export interface RespCloseOut {
  Code: string;
  Message: string;
  Data: data;
}
export interface data {
  Success: boolean;
}

export interface Token {
  token: string;
}
export interface DetalleLogin {
  estado: string;
  mensaje: string;
  detalle: estado;
}
export interface estado {
  estado: response;
}
export interface response {
  sessionId: string;
  usuarioLogin: string;
  nombreUsuario: string;
  codigoRol: string;
  nombreRol: string;
  codigoSatelite: string;
  codigoAgencia: string;
  sucursal: string;
  fechaCreacion: string;
}

export interface sender {
  givenNameSender: string;
  paternalNameSender: string;
  maternalNameSender: string;
  typeNameSender: string;
  currentAddrLine1Sender: string;
  currentAddrLine2Sender: string;
  currentCitySender: string;
  currentStateNameSender: string;
  currentPostalCodeSender: string;
  countryCodeSender: string;
  idType: string;
  addressCurrencyCodeSender: string;
  addressCountryNameSender: string;
  currentEmailAddressSender: string;
  compDetailsIdNumberSender: string;
  compDetailsIdPlaceOfIssueSender: string;
  detailsIdIssueDateSender: string;
  detailsIdExpirationDateSender: string;
  detailsDateOfBirthSender: string;
  detailsOccupationSender: string;
  detailsTransactionReasonSender: string;
  tempAddrLine1Sender: string;
  tempAddrLine2Sender: string;
  tempCitySender: string;
  tempStateCodeSender: string;
  tempPostalCodeSender: string;
  tempCountrySender: string;
  nationalitySender: string;
  relationshipToReceiverSender: string;
  mobileCountryCodeSender: string;
  areYouAPEPRelativeOrFriendSender: string;
  employmentPositionLevelSender: string;
  emailSender: string;
  contactPhoneSender: string;
  contactPhone: string;
  genderSender: string;
  countryOfBirthSender: string;
}
export interface receiver {
  givenNameReceiver: string;
  paternalNameReceiver: string;
  maternalNameReceiver: string;
  typeNameReceiver: string;
}
export interface paymentDetails {
  expLocationStateCodeReceiver: string;
  expLocationCityReceiver: string;
  recordingCountrycodeReceiver: string;
  recordingCurrencycodeReceiver: string;
  destinationCountrycodeReceiver: string;
  destinationCurrencycodeReceiver: string;
  originatigCountrycodeReceiver: string;
  originatigCurrencycodeReceiver: string;
  originatingCityReceiver: string;
  originatingStateReceiver: string;
}

export interface financials {
  originatorsPrincipalAmountReceiver: string;
  destinationPrincipalAmountReceiver: string;
  groosTotalAmountReceiver: string;
  chargesReceiver: string;
}
