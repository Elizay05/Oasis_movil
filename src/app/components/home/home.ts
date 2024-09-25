import { Component, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router";
import { Dialogs, Page } from '@nativescript/core';
import { openUrl } from '@nativescript/core/utils';
import { LoginService } from '../../shared/services/login.service';
import { PedidoService } from '~/app/shared/services/pedido.service';
import { BarcodeScanner } from '@nstudio/nativescript-barcodescanner';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { ModalReservaEscaneadoComponent } from '../modal-reserva-escaneado/modal-reserva-escaneado';
import { EventoService } from '~/app/shared/services/evento.service';
import { CategoriaService } from '~/app/shared/services/categoria.service';
import { ModalEntradaEscaneadoComponent } from '../modal-entrada-escaneado/modal-entrada-escaneado';
import { ProductoService } from '~/app/shared/services/producto.service';
import { GaleriaService } from '~/app/shared/services/galeria.service';
import { ModalProductosComponent } from '../modal-productos/modal-productos';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  rol: string;
  nombre: string;
  foto: string;
  perfil;
  userId: number;
  email: string = '';
  loggedIn: boolean = false;

  pedidos = false
  mesa: any = {};

  categorias: any = [];
  productos: any = [];

  galeriaCarpetas: any = []
  
  public constructor(private router: Router, private page: Page, private activatedRoute: ActivatedRoute, private loginService: LoginService, private pedidoService: PedidoService, private eventoService: EventoService, private categoriaService: CategoriaService, private productoService: ProductoService,  private galeriaService: GaleriaService, private barcodeScanner: BarcodeScanner, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
    if (localStorage.getItem('Oasis.token')) {
      this.loggedIn = true;
      this.perfil = JSON.parse(localStorage.getItem('Oasis.user'))
      this.rol = this.perfil.rol
      this.nombre = this.perfil.nombre
      this.foto = global.url+this.perfil.foto
      console.log(localStorage.getItem('Oasis.user'))
    }
    else {
      this.rol = ""
      this.nombre = ""
      this.foto = ""
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    if (this.perfil.rol == 4) {
      this.pedidoService.verificarPedidoUsuario(this.perfil.user_id).subscribe((res: any) => {
        this.pedidos = res.pedidos
        this.mesa = res.mesa
      });
      
      this.categoriaService.obtenerCategorias().subscribe((data: any) => {
        this.categorias = data
      });

      this.productoService.obtenerProductos().subscribe((data: any) => {
        this.productos = data
      })

      this.galeriaService.obtenerGalerias().subscribe((data: any) => {
        this.galeriaCarpetas = data
      })
    }
  }

  onReserva() {
    this.router.navigate(['evento'])
  }
  
  onQrMesa() {
    const estado = JSON.parse(localStorage.getItem('Oasis.user')).estado;
    if (estado === 2) { 
      Dialogs.alert({
        title: 'Respuesta:',
        message: 'Eres un usuario bloqueado, no puedes realizar pedidos.',
        okButtonText: 'OK',
        cancelable: true,
      });
    }else{
      if (this.pedidos){
        this.router.navigate(['pedido', this.mesa.codigo_qr, this.mesa.nombre])
      }else{
        this.router.navigate(['qr_mesa'])
      }
    }
  }

  onCategoria(id_categoria){
    this.router.navigate(['categoria', id_categoria])
  }

  onProductos() {
    this.router.navigate(['productos']);
  }

  onCarpeta(id_carpeta) {
    this.router.navigate(['galeria', id_carpeta]);
  }

  onGestionarMesas() {
    const estado = JSON.parse(localStorage.getItem('Oasis.user')).estado;
    if (estado === 2) { 
      Dialogs.alert({
        title: 'Respuesta:',
        message: 'Eres un usuario bloqueado, no puedes gestionar mesas.',
        okButtonText: 'OK',
        cancelable: true,
      });
    }else{
      this.router.navigate(['gestionMesas'])
    }
  }

  onEscanearQr() {
    const estado = JSON.parse(localStorage.getItem('Oasis.user')).estado;
    if (estado === 2) {
      Dialogs.alert({
        title: 'Respuesta:',
        message: 'Eres un usuario bloqueado, no puedes escanear entradas.',
        okButtonText: 'OK',
        cancelable: true,
      });
    } else {
      this.barcodeScanner.scan({
        formats: 'QR_CODE',
        cancelLabel: 'cancelar',
        message: 'Coloca el QR dentro del cuadro',
        showFlipCameraButton: true,
        showTorchButton: true,
        torchOn: false,
        resultDisplayDuration: 500,
        beepOnScan: true,
        openSettingsIfPermissionWasPreviouslyDenied: true
      }).then(result => {
        if (result.text) {
          try {
            const qrData = JSON.parse(result.text);

            if (qrData.tipo === 'reserva') {
              const options: ModalDialogOptions = {
                context: {
                  reserva: qrData
                },
                fullscreen: false,
                viewContainerRef: this.viewContainerRef
              };

              this.modalService.showModal(ModalReservaEscaneadoComponent, options).then((result: boolean) => {
                if (result) {
                  this.eventoService.reservaEscaneado(qrData.codigo_reserva).subscribe((res: any) => {
                    if (res) {
                      Dialogs.alert({
                        title: 'Respuesta:',
                        message: res.message,
                        okButtonText: 'OK',
                        cancelable: true,
                      });
                    } else {
                      Dialogs.alert({
                        title: 'Respuesta:',
                        message: 'Reserva no encontrada',
                        okButtonText: 'OK',
                        cancelable: true,
                      });
                    }
                  })
                }
              });
            } else if (qrData.tipo === 'entrada') {
              const options: ModalDialogOptions = {
                context: {
                  entrada: qrData
                },
                fullscreen: false,
                viewContainerRef: this.viewContainerRef
              };

              this.modalService.showModal(ModalEntradaEscaneadoComponent, options).then((result: boolean) => {
                if (result) {
                  this.eventoService.entradaEscaneado(qrData.codigo_entrada).subscribe((res: any) => {
                    if (res) {
                      Dialogs.alert({
                        title: 'Respuesta:',
                        message: res.message,
                        okButtonText: 'OK',
                        cancelable: true,
                      });
                    } else {
                      Dialogs.alert({
                        title: 'Respuesta:',
                        message: 'Entrada no encontrada',
                        okButtonText: 'OK',
                        cancelable: true,
                      });
                    }
                  })
                }
              });
            } else {
              Dialogs.alert({
                title: 'Respuesta:',
                message: 'Tipo de código QR desconocido',
                okButtonText: 'OK',
                cancelable: true,
              });
            }
          } catch (e) {
            Dialogs.alert({
              title: 'Error',
              message: 'Código QR inválido. Contenido recibido: ' + result.text,
              okButtonText: 'OK',
              cancelable: true
            });
          }
        } else {
          Dialogs.alert({
            title: 'Error',
            message: 'El código QR no contiene datos.',
            okButtonText: 'OK',
            cancelable: true
          });
        }
      }, error => {
        alert('Error al escanear el QR: ' + error);
      });
    }
  }


  onModalProductos(producto){
    const options: ModalDialogOptions = {
      context: {
        fotoProducto: producto.foto,
        nombreProducto: producto.nombre,
        categoriaProducto: producto.categoria.nombre,
        precioProducto: producto.precio,
        descripcionProducto: producto.descripcion
      },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalProductosComponent, options)
  }


  mostrarMapa() {
    openUrl('https://www.google.com/maps/place/SENA+Complejo+Sur+Itag%C3%BC%C3%AD/@6.1809892,-75.6059929,15z/data=!4m6!3m5!1s0x8e46823b07fa76e7:0xd858c9c2ddf4b118!8m2!3d6.1809892!4d-75.6059929!16s%2Fg%2F1hc2vps2d?entry=ttu');// pueden cambiar el sitio yo lo puse en la ubicacion del sena pero pueden moverlo a otra parte si quieren que cuando lo habren les abre el google maps a la ubicacion que se puso aqui
  }

  getFullImageUrl(foto: string): string {
    return `${global.url}${foto}`;
  }

  public cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
