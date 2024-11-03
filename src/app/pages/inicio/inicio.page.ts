import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { MisDatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { ScannerService } from 'src/app/services/scanner.service';
import { AuthService } from 'src/app/services/auth.service';
import { Capacitor } from '@capacitor/core';
import { CodigoqrComponent } from 'src/app/components/codigoqr/codigoqr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { Asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonContent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    ForoComponent,
    MisDatosComponent,
    CodigoqrComponent,
    MiclaseComponent
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
      this.selectedComponent = 'codigoqr';

    if (button === 'scan' && Capacitor.getPlatform() !== 'web')
        this.mostrarMiclaseComponent(await this.scanner.scan());
    
    if (button === 'misdatos' && Capacitor.getPlatform() === 'web')
      this.selectedComponent = 'misdatos';
  }

  webQrScanned(qr: string) {
    this.mostrarMiclaseComponent(qr);
  }

  webQrStopped() {
    this.changeComponent('welcome');
  }

  mostrarMiclaseComponent(qr: string) {

    if (Asistencia.isValidAsistenciaQrCode(qr)) {
      this.auth.qrCodeData.next(qr);
      this.changeComponent('miclase');
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
