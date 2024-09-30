import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {

  public usuario: Usuario;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute
  )
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  navegarIngreso() {
    this.usuario.navegarEnviandoListaUsuarios(this.router, '/ingreso');
  }

  ngOnInit() {
  }

}
