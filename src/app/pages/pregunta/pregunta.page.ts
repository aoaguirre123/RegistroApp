import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonCard, IonCardContent, IonLabel, IonItem, IonButton } from '@ionic/angular';  // Importaciones específicas sin `IonContent`
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';  // Ya no se importa desde `@ionic/angular/standalone`
import { DatabaseService } from '../../services/database.service';
import { LanguageComponent } from '../../components/language/language.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    LanguageComponent,
    FormsModule
  ],
})
export class PreguntaPage implements OnInit {
  email = '';
  userSecretQuestion = '';
  respuestaSecreta: string;
  name = '';
  lastname = '';

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private router: Router
  ) {
    this.respuestaSecreta = '';
  }

  async ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    const user = await this.dbService.findUserByEmail(this.email);
    if (user) {
      this.userSecretQuestion = user.secretQuestion;
      this.name = user.firstName;
      this.lastname = user.lastName;
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  async validateSecretAnswer() {
    const user = await this.dbService.findUserByEmail(this.email);
    if (user && user.secretAnswer === this.respuestaSecreta) {
      this.router.navigate(['/correcto'], { queryParams: { clave: user.password } });
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  public iraingreso(): void {
    this.router.navigate(['/ingreso']);
  }
}
