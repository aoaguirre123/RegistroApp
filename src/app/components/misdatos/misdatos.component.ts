import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { addIcons } from 'ionicons';
import { save } from 'ionicons/icons';
@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class MisDatosComponent{

  usuario: User = new User();
  usuarios: User[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();
  showDatePicker: boolean = false;
  tempDate: string;

  constructor(
    private bd: DatabaseService,
    private auth: AuthService,
    private api: APIClientService) 
  { 
    this.bd.userList.subscribe((usuarios) => {
      if (usuarios) {
        this.usuarios = usuarios;
      }
    });
    this.auth.readAuthUser().then((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        console.log(this.usuario);
      }
    });
    addIcons({ save });
    this.tempDate = this.usuario.dateOfBirth ? this.usuario.dateOfBirth.toISOString() : '';
  }

  guardarUsuario() {
    if (this.usuario.firstName.trim() === '') {
      showToast('El usuario debe tener un nombre');
    } else {
      console.log(this.usuario);
      this.bd.saveUser(this.usuario);
      this.auth.saveAuthUser(this.usuario);
      showToast('El usuario fue Actualizado correctamente');
    }
  }

  public actualizarNivelEducacional(event: any) {
    // debugger
    // this.usuario.educationalLevel 
    //   = EducationalLevel.findLevel(event.detail.value)!;
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    if (this.showDatePicker) {
      this.tempDate = this.usuario.dateOfBirth ? this.usuario.dateOfBirth.toISOString() : ''; // Inicializa la fecha temporal
    }
  }

  onFechaNacimientoChange(event: any) {
    // Aquí no actualizamos la fecha de usuario aún, solo guardamos el valor temporal
    this.tempDate = event.detail.value; // Actualiza la fecha temporal cuando se selecciona un día
  }

  onFechaNacimientoConfirm() {
    // Solo actualiza la fecha del usuario al confirmar
    this.usuario.dateOfBirth = new Date(this.tempDate);
    this.showDatePicker = false; // Oculta el calendario después de seleccionar una fecha
  }

  onFechaNacimientoCancel() {
    this.showDatePicker = false; // Oculta el calendario si se cancela
  }

  // openDatePicker() {
  //   const datePicker = document.querySelector('ion-datetime');
  //   if (datePicker) {
  //     datePicker.click(); // Simula un clic en el ion-datetime
  //   }
  // }

}
