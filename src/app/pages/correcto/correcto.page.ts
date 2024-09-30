import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  )
  { 
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }
  
  navegar(pagina: string) {
    this.usuario.navegarEnviandoUsuario(this.router, pagina);
  }

  ngOnInit() {
  }

}
