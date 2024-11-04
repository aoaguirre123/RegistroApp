import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonCard, IonCardContent, IonLabel, IonItem, IonButton } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule, 
    IonCard, 
    IonCardContent,
    IonLabel,
    IonItem,
    IonButton,
    ReactiveFormsModule]
})
export class PreguntaPage implements OnInit {

  email='';
  userSecretQuestion = '';
  respuestaSecreta :string;
  name = '';
  lastname='';
  password='';

  //public usuario: Usuario = new Usuario();
  //public respuesta: string = '';

  
  
  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private router: Router
  ) { this.respuestaSecreta=''; }

  public iraingreso(): void {

    this.router.navigate(['/ingreso']);

  }
  async ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    const user = await this.dbService.findUserByEmail(this.email);
    if (user) {
      this.userSecretQuestion = user.secretQuestion;
      //this.secretAnswer = user.secretAnswer;
      this.name = user.firstName;
      this.lastname = user.lastName;
    } else {
      this.router.navigate(['/incorrecto']);
    }
  }

  // async validateSecretAnswer() {
  //   const user = await this.dbService.findUserByEmail(this.email);
  //   if ( user.secretAnswer === this.secretAnswer.trim().toLowerCase()) {
  //     this.router.navigate(['/correcto'], { queryParams: { clave: user.password } });
  //   } else {
  //     this.router.navigate(['/incorrecto']);
  //   }
  // }

  async validateSecretAnswer() {
    const user = await this.dbService.findUserByEmail(this.email);
    
    // Check if user is defined
    if (user) {
      if (user.secretAnswer === this.respuestaSecreta) {
            this.router.navigate(['/correcto'], { queryParams: { clave: user.password } });
        } else {
            this.router.navigate(['/incorrecto']);
        }
    } else {
        this.router.navigate(['/incorrecto']);
    }
  }

  // public validarRespuestaSecreta(): void {

  //   const usuario = new Usuario();

  //   if (this.usuario.respuestaSecreta === this.respuesta) {
  //     const navigationExtras: NavigationExtras = {
  //       state: {
  //         usuario: this.usuario
  //       }
  //     }
  //     this.router.navigate(['/correcto'], navigationExtras);
  //   }
  //   else {
  //     this.router.navigate(['/incorrecto']);
  //   }
  // }

}
