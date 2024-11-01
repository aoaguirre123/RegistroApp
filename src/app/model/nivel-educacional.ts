export class NivelEducacional {

  id = 1;
  nombre = 'Básica Incompleta';

  constructor() {}

  setNivelEducacional(id: number, nombre: string): void {
    this.id = id;
    this.nombre = nombre;
  }

  static getNivelEducacional(id: number, nombre: string): NivelEducacional {
    const nivel = new NivelEducacional();
    nivel.setNivelEducacional(id, nombre);
    return nivel;
  }

  static getNivelesEducacionales(): NivelEducacional[] {
    const niveles: NivelEducacional[] = [
      NivelEducacional.getNivelEducacional(1, 'Básica Incompleta'),
      NivelEducacional.getNivelEducacional(2, 'Básica Completa'),
      NivelEducacional.getNivelEducacional(3, 'Media Incompleta'),
      NivelEducacional.getNivelEducacional(4, 'Media Completa'),
      NivelEducacional.getNivelEducacional(5, 'Superior Incompleta'),
      NivelEducacional.getNivelEducacional(6, 'Superior Completa')
    ];
    return niveles;
  }
  
  getEducacion(): string {
    return this.id.toString() + ' - ' + this.nombre;
  }

  static buscarNivelEducacional(id: number): NivelEducacional | undefined {
    return NivelEducacional.getNivelesEducacionales().find(n => n.id === id);
  }

}
