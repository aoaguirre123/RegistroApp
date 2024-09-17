import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage {

  public usuario: Usuario;

  constructor(
      private router: Router
    , private toastController: ToastController) 
  {
    this.usuario = new Usuario();
    this.usuario.cuenta = 'atorres';
    this.usuario.password = '1234';
  }

  public ingresar(): void {

    const error = this.usuario.validarUsuario();
    if(error) {
      this.mostrarMensajeEmergente(error);
      return;
    } 
    const usu: Usuario | undefined = Usuario.buscarUsuarioValido(this.usuario.cuenta, this.usuario.password);

    if (usu) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usu
        }
      };
      this.mostrarMensajeEmergente('¡Bienvenido(a) al Sistema de Asistencia DUOC!');
      this.router.navigate(['/inicio'], navigationExtras);
    }
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}
