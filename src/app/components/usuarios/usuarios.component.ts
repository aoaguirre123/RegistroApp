import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { showToast } from 'src/app/tools/message-functions';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ]
})
export class UsuariosComponent implements OnInit {

  usuario: User = new User();
  user: User = new User();
  users: User[] = [];

  constructor(
    private auth: AuthService,
    private db: DatabaseService
  ) { 
    this.auth.authUser.subscribe((usuario) => {
      if (usuario) {
        this.user = usuario;
      }
    });
    addIcons({ trashOutline });
  }

  async ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.db.readUsers();
  }

  async deleteUser(user: User) {
    const success = await this.db.deleteByUserName(user.userName);
    if (success) {
      showToast(`Usuario eliminado correctamente: ${user.userName}`);
      this.loadUsers();
    }
  }


}
