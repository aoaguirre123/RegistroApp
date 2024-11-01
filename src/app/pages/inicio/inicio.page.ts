import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { QrWebScannerComponent } from 'src/app/components/qr-web-scanner/qr-web-scanner.component';
import { DinosaurComponent } from 'src/app/components/dinosaur/dinosaur.component';
import { ForumComponent } from 'src/app/components/forum/forum.component';
import { ScannerService } from 'src/app/services/scanner.service';
import { AuthService } from 'src/app/services/auth.service';
import { Capacitor } from '@capacitor/core';
import { Dinosaur } from 'src/app/model/dinosaur';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule
    , FormsModule
    , TranslateModule
    , IonContent
    , HeaderComponent
    , FooterComponent
    , WelcomeComponent
    , QrWebScannerComponent
    , DinosaurComponent
    , ForumComponent
  ]
})
export class InicioPage {

  @ViewChild(FooterComponent) footer!: FooterComponent;
  selectedComponent = 'welcome';
  
  constructor(
    private auth: AuthService,
    private scanner: ScannerService
  )
  {}

  ionViewWillEnter() {
    this.changeComponent('welcome');
  }

  async headerClick(button: string) {

    if (button === 'scan' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'qrwebscanner';

    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
        this.showDinoComponent(await this.scanner.scan());
  }

  webQrScanned(qr: string) {
    this.showDinoComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  showDinoComponent(qr: string) {

    if (Dinosaur.isValidDinosaurQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      this.changeComponent('dinosaur');
      return;
    }
    
    this.changeComponent('welcome');
  }

  footerClick(button: string) {
    this.selectedComponent = button;
  }

  changeComponent(name: string) {
    this.selectedComponent = name;
    this.footer.selectedButton = name;
  }



}
