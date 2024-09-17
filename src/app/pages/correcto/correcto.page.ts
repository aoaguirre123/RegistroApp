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
  
  navegarIngreso() {
    this.router.navigate(['/ingreso']);
  }

  ngOnInit() {
  }

}
