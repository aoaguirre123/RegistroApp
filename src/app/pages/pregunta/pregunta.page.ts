import { Asistencia } from './../../interfaces/asistencia';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario = new Usuario();
  public respuesta: string = '';

  public constructor(
    // private animationController: AnimationController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  )
  {
    this.usuario.recibirPregunta(this.activatedRoute, this.router)
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandoUsuario(this.router, pagina);
  }

    ngOnInit() {
  }

  public validarRespuestaSecreta(): void {
    if (this.usuario.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          cuenta: this.usuario.cuenta,
          listaUsuarios: this.usuario.listaUsuarios,
          asistencia: this.usuario.asistencia
        }
      }
      this.router.navigate(['/correcto'], navigationExtras);
    }
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          cuenta: this.usuario.cuenta,
          listaUsuarios: this.usuario.listaUsuarios,
          asistencia: this.usuario.asistencia
        }
      }
      this.router.navigate(['/incorrecto'], navigationExtras);
    }
  }

}
