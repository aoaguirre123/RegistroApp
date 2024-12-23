import { Component, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { addIcons } from 'ionicons';
import { colorWandOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [
      CommonModule
    , FormsModule 
    , TranslateModule
    , IonicModule
    , LanguageComponent
  ]
})
export class IngresoPage implements ViewWillEnter {
  
  @ViewChild('selectLanguage') selectLanguage!: LanguageComponent;

  correo: string;
  password: string;

  constructor(
      private router: Router
    , private translate: TranslateService
    , private authService: AuthService) 
  {
    this.correo = 'atorres';
    this.password = '1234';
    addIcons({ colorWandOutline }); 
  }

  async ionViewWillEnter() {
    this.selectLanguage.setCurrentLanguage();
  }

  navigateTheme() {
    this.router.navigate(['/temas']);
  }

  navegarCorreo() {
    this.router.navigate(['/correo']);
  }

  navegarMiRuta() {
    this.router.navigate(['/miruta']);
  }
  
  login() {
    this.authService.login(this.correo, this.password);
  }

  signUp() {
    this.router.navigate(['/registrarme']);
  }


}
