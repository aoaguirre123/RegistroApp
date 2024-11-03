import { showAlert, showAlertError } from "../tools/message-functions";

export class Asistencia {

  static jsonAsistenciaExample =
    `{
      "bloqueInicio": 1,
      "bloqueTermino": 3,
      "dia": "Lunes",
      "horaFin": "12:00",
      "horaInicio": "10:00",
      "idAsignatura": "MAT101",
      "nombreAsignatura": "Matemáticas Básicas",
      "nombreProfesor": "Prof. Juan Pérez",
      "seccion": "A1",
      "sede": "Campus Norte"
    }`;

  static jsonAsistenciaEmpty =
    `{
      "bloqueInicio": 0,
      "bloqueTermino": 0,
      "dia": "",
      "horaFin": "",
      "horaInicio": "",
      "idAsignatura": "",
      "nombreAsignatura": "",
      "nombreProfesor": "",
      "seccion": "",
      "sede": ""
    }`;

  bloqueInicio = 0;
  bloqueTermino = 0;
  dia = '';
  horaFin = '';
  horaInicio = '';
  idAsignatura = '';
  nombreAsignatura = '';
  nombreProfesor = '';
  seccion = '';
  sede = '';

  constructor() { }

  public static getNewAsistencia(
    bloqueInicio: number,
    bloqueTermino: number,
    dia: string,
    horaFin: string,
    horaInicio: string,
    idAsignatura: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    seccion: string,
    sede: string
  ) {
    const asistencia = new Asistencia();
    asistencia.bloqueInicio = bloqueInicio;
    asistencia.bloqueTermino = bloqueTermino;
    asistencia.dia = dia;
    asistencia.horaFin = horaFin;
    asistencia.horaInicio = horaInicio;
    asistencia.idAsignatura = idAsignatura;
    asistencia.nombreAsignatura = nombreAsignatura;
    asistencia.nombreProfesor = nombreProfesor;
    asistencia.seccion = seccion;
    asistencia.sede = sede;
    return asistencia;
  }

  // Devuelve verdadero si el texto del QR contiene todos los datos de
  // una asistencia, de lo contrario se ha escaneado un QR que podría ser 
  // válido, pero no corresponde a la asistencia de esta aplicación.

  static isValidAsistenciaQrCode(qr: string) {
    
    if (qr === '') return false;

    try {
      const json = JSON.parse(qr);

      if ( json.bloqueInicio      !== undefined
        && json.bloqueTermino     !== undefined
        && json.dia               !== undefined
        && json.horaFin           !== undefined
        && json.horaInicio        !== undefined
        && json.idAsignatura      !== undefined
        && json.nombreAsignatura  !== undefined
        && json.nombreProfesor    !== undefined
        && json.seccion           !== undefined
        && json.sede              !== undefined)
      {
        return true;
      }
    } catch(error) { }

    showAlert('El código QR escaneado no corresponde a una asistencia válida');
    return false;
  }
  
}
