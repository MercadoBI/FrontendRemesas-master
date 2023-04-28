export const environment = {
  production: false,//
  dominio: {
    host: 'https://javatest-eldc-test.java.us2.oraclecloudapps.com/app-banco-azteca-frontend',
  },
  apiRest: {
    //host: "https://bancoaztecaremesaswebapihg.azurewebsites.net/api"
    //host: "http://10.105.0.8:9000/api"
   // host: "https://serviciosazure.abdigital.com:7443/ServiceRemesaPanamaDev/api"
    //host: "https://serviciosazure.abdigital.com:7443/ServiceRemesasBazQa/api"
    //host: 'https://wsprodazure.abdigital.com:7443/ServiceRemesasPrd/api',
    //host: 'https://wsprodazure.abdigital.com:7443/ServiceRemesasPrdV2/api',
   // host: "https://localhost:63630/api"
  },
  apiExt: {
    urlhub:
      'https://serviciosazure.abdigital.com:7443/servicesignalbazqa/hubcnx?apikey=7B11D7F3-A747-4EBD-AC93-CC352E15HYTT9',

    //urlhub:'https://wsprodazure.abdigital.com:7443/servicesignalprd/hubcnx?apikey=27705C82-FCD3-43FC-AAB0-53E03569A342',
    host: "https://serviciosazure.abdigital.com:7443/servicesignalbazqa/api"
    //host: 'https://wsprodazure.abdigital.com:7443/servicesignalprd/api',
  },
  env: 'QA'//LOCAL,DEV,QA,PRD
};
