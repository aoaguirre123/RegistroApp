import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, AfterViewInit {

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  
  public usuario: Usuario;
  public loading: HTMLIonLoadingElement | null = null;
  public escaneando = false;
  public datosQR: string = '';

  public constructor(
    private loadingController: LoadingController,
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  )
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
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
    if (this.escaneando === true) {
      this.detenerEscaneoQR();
      this.usuario.navegarEnviandoUsuario(this.router, '/misdatos');
    } else {
      this.usuario.navegarEnviandoUsuario(this.router, '/misdatos');
    }
  }

  public navegarMiClase(): void {
    if (this.escaneando === true) {
      this.detenerEscaneoQR();
      this.usuario.navegarEnviandoUsuario(this.router, '/miclase');
      } else {
        this.usuario.navegarEnviandoUsuario(this.router, '/miclase');
      }
  }

  logout() {
    this.usuario.navegarEnviandoUsuario(this.router, '/ingreso');
    if (this.escaneando === true) {
      this.detenerEscaneoQR();
      }
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        let stream = this.video.nativeElement.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach((track: { stop: () => any; }) => track.stop());
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    this.usuario.asistencia = JSON.parse(datosQR);
    this.usuario.navegarEnviandoUsuario(this.router, '/miclase');
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
    let stream = this.video.nativeElement.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach((track: { stop: () => any; }) => track.stop());
  }

  ngOnInit() {
    this.comenzarEscaneoQR();
  }
  
  
}