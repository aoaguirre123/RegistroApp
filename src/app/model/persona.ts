import { NivelEducacional } from './nivel-educacional';

export class Persona {

  nombre = '';
  apellido = '';
  nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
  fechaNacimiento: Date = new Date();
  direccion = '';

  constructor() {}

  public getFechaNacimiento(): string {
    if (!this.fechaNacimiento) return 'No asignada';
    const day = this.fechaNacimiento.getDate().toString().padStart(2, '0');
    const month = (this.fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
    const year = this.fechaNacimiento.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
