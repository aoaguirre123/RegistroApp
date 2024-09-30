import { Component,  OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})

export class CorreoPage implements OnInit{
  public usuario: Usuario;

  constructor(
    private router: Router
    , private activatedRoute: ActivatedRoute
  ) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirListaUsuarios(this.activatedRoute, this.router);
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandoUsuario(this.router, pagina);
  }
  
  ngOnInit() {
  }


  public ingresarPaginaValidarRespuestaSecreta(): void {
    if (!this.usuario.buscarUsuarioPorCorreo(this.usuario.correo)) {
      this.usuario.navegarEnviandoListaUsuarios(this.router, '/incorrecto');
    }
    else {
      this.usuario.navegarPregunta(this.router);
    }
  }

}


