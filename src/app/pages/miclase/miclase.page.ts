import { MiclasePageModule } from './miclase.module';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { AlertController, AnimationController, LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})

export class MiclasePage implements OnInit, AfterViewInit {

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public escaneando = false;
  public datosQR: any = null;
  public loading: HTMLIonLoadingElement | null = null;
  public usuario: Usuario = new Usuario();
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();

  public constructor(
    private loadingController: LoadingController,
    private alertController: AlertController, 
    private activatedRoute: ActivatedRoute,
    private animationController: AnimationController,
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

  navegarInicio() {
    const NavigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/inicio'], NavigationExtras);
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

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }
  
    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;
    console.log(w + ' ' + h);
  
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
  
    if (qrCode) {
      this.escaneando = false;
      try {
        // Intenta parsear el JSON si es válido
        this.datosQR = JSON.parse(qrCode.data);
        console.log("Datos QR:", this.datosQR);  // Verifica los datos
      } catch (error) {
        console.error("Error al parsear el QR como JSON:", error);
        // Si no es un JSON, almacena los datos como string
        this.datosQR = qrCode.data;
      }
    }
  
    return this.datosQR !== null && this.datosQR !== '';
  }


  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log('Datos Obtenidos');
        // Dejar de usar la camara una vez escaneado el QR
        let stream = this.video.nativeElement.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach((track: { stop: () => any; }) => track.stop());
      } else {
        if (this.escaneando) {
          console.log('Escaneando...');
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log('Video aun no tiene datos');
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
    let stream = this.video.nativeElement.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach((track: { stop: () => any; }) => track.stop());
  }

  public limpiarDatos(): void{
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
  }

  ngOnInit() {
  }

}


