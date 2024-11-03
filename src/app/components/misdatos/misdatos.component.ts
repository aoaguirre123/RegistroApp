import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSelect, IonSelectOption, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonIcon, IonLabel, IonCard, IonCardTitle } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/model/post';
import { APIClientService } from 'src/app/services/apiclient.service';
import { EducationalLevel } from 'src/app/model/educational-level';
import { showToast } from 'src/app/tools/message-functions';
import { addIcons } from 'ionicons';
import { save, saveOutline } from 'ionicons/icons';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCard, IonLabel, IonIcon, IonButton, IonInput, IonContent, IonHeader, IonTitle, IonToolbar
    , CommonModule, FormsModule, IonItem, IonSelect, IonSelectOption]
})
export class MisDatosComponent{

  usuario: User = new User();
  usuarios: User[] = [];
  publicaciones: Post[] = [];
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();

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

  onFechaNacimientoChange(event: any) {
    this.usuario.dateOfBirth = new Date(event.detail.value); // Convertir de ISO a Date
  }

}
