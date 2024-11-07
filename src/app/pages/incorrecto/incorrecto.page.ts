import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [  
      CommonModule
    , FormsModule 
    , TranslateModule
    , IonicModule
    , LanguageComponent
  ]
})
export class IncorrectoPage implements OnInit {
  correo: string;
  constructor(
    private router: Router
  ) {
    addIcons({ arrowBack });   
    this.correo = '';
    
  }

  navegarIngreso() {
  this.router.navigate(['/ingreso']);
  }

  ngOnInit() {
  }

}

// import { Usuario } from './../../model/usuario';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-incorrecto',
//   templateUrl: './incorrecto.page.html',
//   styleUrls: ['./incorrecto.page.scss'],
// })
// export class IncorrectoPage implements OnInit {

//   public usuario: Usuario = new Usuario();

//   constructor(private router: Router,){}

//   navegarIngreso() {
//     this.router.navigate(['/ingreso']);
//   }

//   ngOnInit() {
//   }

// }
