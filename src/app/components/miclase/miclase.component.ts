import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonIcon } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule, TranslateModule, LanguageComponent]
})
export class MiclaseComponent implements OnDestroy {

  asistencia: any;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.qrCodeData.subscribe((qr) => {
      this.asistencia = qr? JSON.parse(qr): null;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
