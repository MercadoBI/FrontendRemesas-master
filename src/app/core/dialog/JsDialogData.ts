
export interface DialogData {
    titulo: string;
    contenido: string;
    btnAceptar: DialogButton;
    btnCancelar: DialogButton;
  }
  
  export interface DialogButton {
    visible: boolean;
    texto : string;
  }