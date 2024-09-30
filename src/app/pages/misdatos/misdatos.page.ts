import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AlertController, ToastController } from '@ionic/angular';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
  providers: [MatDatepickerModule, MatInputModule, MatFormFieldModule, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisdatosPage implements OnInit {

  public usuario: Usuario;

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  constructor(
    private alertController: AlertController, 
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private router: Router
  )
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  logout() {
    this.usuario.navegarEnviandoUsuario(this.router, '/ingreso');
  }

  navegarInicio() {
    this.usuario.navegarEnviandoUsuario(this.router, '/inicio');
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  actualizarUsuario() {
    this.usuario.actualizarUsuario();
    this.mostrarMensajeEmergente('Datos guardados con éxito');
  }

  ngOnInit() {
  }

}
