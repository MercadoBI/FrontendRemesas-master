// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  dominio: {
    host: '',
  },
  apiRest: {
    //host: 'https://wsprodazure.abdigital.com:7443/ServiceRemesasPrd/api',
    //host: "https://serviciosazure.abdigital.com:7443/ServiceRemesaPanamaDev/api"
    //host: 'https://serviciosazure.abdigital.com:7443/ServiceRemesasBazQa/api',
    //host: "http://10.105.0.8:9000/api"
    //host: "https://bancoaztecaremesaswebapihg.azurewebsites.net/api"
     host: "https://localhost:50612/api" //Server Banco Azteca 
    ////host: "https://aztecawebapi.azurewebsites.net/api"
    //  host:"https://10.105.0.8:9099/api"
  },
  apiExt: {
    //urlhub: 'https://serviciosazure.abdigital.com:7443/servicesignalbazqa/hubcnx?apikey=7B11D7F3-A747-4EBD-AC93-CC352E15HYTT9',

    urlhub:
      'https://wsprodazure.abdigital.com:7443/servicesignalprd/hubcnx?apikey=27705C82-FCD3-43FC-AAB0-53E03569A342',
    //host: 'https://serviciosazure.abdigital.com:7443/servicesignalbazqa/api',
    host: 'https://wsprodazure.abdigital.com:7443/servicesignalprd/api',
  },
  env: 'LOCAL'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
