import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, chatbubblesSharp, book, personCircleOutline, people } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , IonFooter, IonToolbar, IonSegment, IonSegmentButton, IonIcon
  ]
})
export class FooterComponent {

  selectedButton = 'welcome';
  @Output() footerClick = new EventEmitter<string>();
  user: User = new User();

  constructor(
    private auth: AuthService
  ) { 
    addIcons({home,personCircleOutline,book,chatbubblesSharp,people});
    this.auth.authUser.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  sendClickEvent($event: any) {
    this.footerClick.emit(this.selectedButton);
  }

}
