import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private router: Router,){}

  navegarIngreso() {
    this.router.navigate(['/ingreso']);
  }

  ngOnInit() {
  }

}
