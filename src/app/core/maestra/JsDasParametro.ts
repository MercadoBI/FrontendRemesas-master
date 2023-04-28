
export class JsDasParametro {

    estado : string = "";
    flag: number = 0;
    idDasParametro: number = 0;
    tipoParametro: string = "";
    valor1: string = "";
    valor2: string = "";
    valor3: string = "";
    valor4: string = "";
    valor5: string = "";

    public  getEstado() {
        return this.estado;
      }
    
      public  getFlag() {
        return this.flag;
      }
    
      public  getIdDasParametro() {
        return this.idDasParametro;
      }
    
      public  getTipoParametro() {
        return this.tipoParametro;
      }
    
      public  getValor1() {
        return this.valor1;
      }
    
      public  getValor2() {
        return this.valor2;
      }
    
      public  getValor3() {
        return this.valor3;
      }
    
      public  getValor4() {
        return this.valor4;
      }
    
      public  getValor5() {
        return this.valor5;
      }
    
     // Setter Methods 
    
      public  setEstado( estado : string ) {
        this.estado = estado;
      }
    
      public  setFlag( flag :number ) {
        this.flag = flag;
      }
    
      public  setIdDasParametro( idDasParametro:number ) {
        this.idDasParametro = idDasParametro;
      }
    
      public  setTipoParametro(  tipoParametro : string) {
        this.tipoParametro = tipoParametro;
      }
    
      public  setValor1( valor1 : string ) {
        this.valor1 = valor1;
      }
    
      public  setValor2( valor2 : string) {
        this.valor2 = valor2;
      }
    
      public  setValor3( valor3 : string) {
        this.valor3 = valor3;
      }
    
      public  setValor4( valor4 : string) {
        this.valor4 = valor4;
      }
    
      public  setValor5( valor5 : string) {
        this.valor5 = valor5;
      }
}