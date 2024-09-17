import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  
  public usuario: Usuario = new Usuario();

  public constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  )
  {
    this.activatedRoute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
        this.router.navigate(['/ingreso']);
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
      .fromTo('transform', 'translate(-50%)', 'translate(100%)')
      .play();
  }

  public navegarMisDatos(): void {
    const navigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/misdatos'], navigationExtras);
  }

  public navegarMiClase(): void {
    const navigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/miclase'], navigationExtras);
  }

  logout() {
    this.router.navigate(['/ingreso']);
  }

  ngOnInit() {
  }
  
}