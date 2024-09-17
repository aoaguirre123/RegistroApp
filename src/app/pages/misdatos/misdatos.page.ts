import { MisdatosPageModule } from './misdatos.module';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AlertController, NavController, NavParams, ToastController } from '@ionic/angular';
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

  public usuario: Usuario = new Usuario();

  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  constructor(
    private alertController: AlertController, 
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
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

  guardarDatos() {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/misdatos'], navigationExtras);
    this.mostrarMensajeEmergente('Datos guardados con éxito');
  }

  logout() {
    this.router.navigate(['/ingreso']);
  }

  navegarInicio() {
    const NavigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/inicio'], NavigationExtras);
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  ngOnInit() {
  }

}
