import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { IonContent, IonButton, IonIcon, IonLabel, IonToolbar, IonTitle, IonCard, IonCardContent, AnimationController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonTitle, IonToolbar, IonLabel, IonIcon, IonButton, IonContent, TranslateModule]
})
export class WelcomeComponent implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  user: User = new User();

  constructor(private auth: AuthService,
    private animationController: AnimationController
  ) { 
    this.auth.authUser.subscribe((user) => {
      console.log(user);
      if (user) {
        this.user = user;
      }
    });
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(-100%)', 'translate(100%)')
      .play();
  }

}
