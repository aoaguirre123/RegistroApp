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
    this.activatedRoute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
        this.router.navigate(['/ingreso']);
      }
    });
  }

  public iraingreso(): void {

    this.router.navigate(['/ingreso']);

  }

    ngOnInit() {
  }



  public validarRespuestaSecreta(): void {

    const usuario = new Usuario();

    if (this.usuario.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      }
      this.router.navigate(['/correcto'], navigationExtras);
    }
    else {
      
      this.router.navigate(['/incorrecto']);
    }
  }

}
