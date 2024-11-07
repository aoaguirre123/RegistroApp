import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonButton, IonIcon} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule, IonCard, IonCardContent, IonButton, IonIcon, TranslateModule, LanguageComponent]
})
export class CorrectoPage implements OnInit {
  clave='';
  constructor( 
    private route: ActivatedRoute,
    private router:  Router

  ) 
  
  {addIcons({ arrowBack });
}
  navegarIngreso() {
    this.router.navigate(['/ingreso']);
    }
    ngOnInit() {
      this.clave = this.route.snapshot.queryParams['clave'];
    }
  }



