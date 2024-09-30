import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})

export class MiclasePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public datosQR: any = null;
  public usuario: Usuario;

  public constructor(
    private alertController: AlertController, 
    private activatedRoute: ActivatedRoute,
    private animationController: AnimationController,
    private router: Router
  )
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  navegarInicio() {
    this.usuario.navegarEnviandoUsuario(this.router, '/inicio');
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

  // public limpiarDatos(): void{
  //   this.usuario.asistencia = this.usuario.asistenciaVacia();
  // }

  ngOnInit() {
  }

}


