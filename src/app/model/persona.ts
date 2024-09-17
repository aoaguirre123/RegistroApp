import { NivelEducacional } from './nivel-educacional';

export class Persona {

  public nombre;
  public apellido;
  public nivelEducacional: NivelEducacional;
  public fechaNacimiento: Date | undefined;

  constructor() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = new Date();
  }

  public getFechaNacimiento(): string {
    if (!this.fechaNacimiento) return 'No asignada';
    const day = this.fechaNacimiento.getDate().toString().padStart(2, '0');
    const month = (this.fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
    const year = this.fechaNacimiento.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
