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
import { save, chevronBackOutline } from 'ionicons/icons';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LanguageComponent,
    TranslateModule
  ]
})
export class RegistrarmePage {
  
  usuario: User = new User();
  usuarios: User[] = [];
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();
  showDatePicker: boolean = false;
  tempDate: string;

  constructor(
    private bd: DatabaseService,
    private auth: AuthService,
    private router: Router) 
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
    addIcons({ save, chevronBackOutline });
    this.tempDate = this.usuario.dateOfBirth ? this.usuario.dateOfBirth.toISOString() : '';
  }

  async guardarUsuario() {
    const camposRequeridos = [
      { campo: this.usuario.userName, mensaje: 'El usuario debe tener un nombre de usuario' },
      { campo: this.usuario.firstName, mensaje: 'El usuario debe tener un nombre' },
      { campo: this.usuario.lastName, mensaje: 'El usuario debe tener un apellido' },
      { campo: this.usuario.email, mensaje: 'El usuario debe tener un correo electrónico' },
      { campo: this.usuario.address, mensaje: 'El usuario debe tener una dirección' },
      { campo: this.usuario.secretQuestion, mensaje: 'El usuario debe tener una pregunta secreta' },
      { campo: this.usuario.secretAnswer, mensaje: 'El usuario debe tener una respuesta secreta' },
      { campo: this.usuario.password, mensaje: 'El usuario debe tener una contraseña' }
    ];

    for (const campo of camposRequeridos) {
      if (!campo.campo || campo.campo.trim() === '') {
          showToast(campo.mensaje);
          return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.usuario.email)) {
        showToast('El correo electrónico no tiene un formato válido');
        return;
    }
    
    try {
      // Verificar si el nombre de usuario ya existe
      const existeUsuario = await this.bd.findUserByUserName(this.usuario.userName);
      if (existeUsuario) {
          showToast('El nombre de usuario ya está en uso. Por favor, elige otro.');
          return;
      }

      // Guardar el usuario si no existe
      console.log(this.usuario);
      await this.bd.saveUser(this.usuario);
      this.auth.saveAuthUser(this.usuario);
      showToast('Usuario registrado con éxito');
      this.router.navigate(['/inicio']);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        showToast('Ocurrió un error al registrar el usuario. Intenta nuevamente.');
    }
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

  goBack() {
    this.router.navigate(['/ingreso']);
  }
}
