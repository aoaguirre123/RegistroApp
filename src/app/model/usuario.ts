import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";
import { Asistencia } from '../interfaces/asistencia';

export class Usuario extends Persona {

  cuenta = '';
  correo = '';
  password = '';
  preguntaSecreta = '';
  respuestaSecreta = '';

  constructor() {
    super();
  }

  public asistenciaVacia(): Asistencia {
    return {  
      bloqueInicio: 0,
      bloqueTermino: 0,
      dia: '',
      horaFin: '',
      horaInicio: '',
      idAsignatura: '',
      nombreAsignatura: '',
      nombreProfesor: '',
      seccion: '',
      sede: ''
    };
  }

  public static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date,
    direccion: string
  ) {
    let usuario = new Usuario();
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    usuario.direccion = direccion;
    return usuario;
  }

  // public buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
  //   return this.listaUsuarios.find(usu => usu.cuenta === cuenta && usu.password === password);
  // }

  // public buscarUsuarioPorCuenta(cuenta: string): Usuario | undefined {
  //   return this.listaUsuarios.find(usu => usu.cuenta === cuenta);
  // }

  // public buscarUsuarioPorCorreo(correo: string): Usuario | undefined {
  //   return this.listaUsuarios.find(usu => usu.correo === correo);
  // }

  public override toString(): string {
    return `      
      Cuenta: ${this.cuenta}
      Correo: ${this.correo}
      Password: ${this.password}
      Pregunta Secreta: ${this.preguntaSecreta}
      Respuesta Secreta: ${this.respuestaSecreta}
      Nombre: ${this.nombre}
      Apellido: ${this.apellido}
      Nivel Educacional: ${this.nivelEducacional.getEducacion()}
      Fecha de Nacimiento: ${this.getFechaNacimiento()}
      Direccion: ${this.direccion}
      `;
  }

}