import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [  
      CommonModule
    , FormsModule 
    , TranslateModule
    , IonicModule
    , LanguageComponent  ]
})
export class CorreoPage {
  email: string;
  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private toastController: ToastController
  ) {   
    this.email = '';
  }

  async validateEmail() {
    const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.router.navigate(['/incorrecto']);
      return;
    }

    const user = await this.databaseService.findUserByEmail(this.email);
    if (user) {
      this.router.navigate(['/pregunta'], { queryParams: { email: this.email } });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  navegarIngreso() {
    this.router.navigate(['/ingreso']);
  }

}
