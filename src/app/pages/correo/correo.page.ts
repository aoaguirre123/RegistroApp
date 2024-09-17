import { Component,  OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})

export class CorreoPage implements OnInit{
  public correo: string = '';

  constructor(private router: Router) { }

  public iraingreso(): void {

    this.router.navigate(['/ingreso']);

  }
  
  ngOnInit() {
  }


  public ingresarPaginaValidarRespuestaSecreta(): void {
    const usuario = new Usuario();
    const usuarioEncontrado = usuario.buscarUsuarioPorCorreo(this.correo);
    if (!usuarioEncontrado) {
      alert('EL CORREO NO EXISTE DENTRO DE LAS CUENTAS VALIDAS DEL SISTEMA');
    }
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }

}


