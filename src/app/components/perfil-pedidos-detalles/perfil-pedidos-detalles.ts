import { Component, ViewContainerRef } from '@angular/core'
import { Router } from "@angular/router"; 
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { PedidoService } from '~/app/shared/services/pedido.service';
import { Dialogs } from '@nativescript/core';
import { ModalEliminarPedidoComponent } from '../modal-eliminar-pedido/modal-eliminar-pedido';
import { ModalMotivoEliminacionComponent } from '../modal-motivo-eliminacion/modal-motivo-eliminacion';



@Component({
  selector: 'perfil-pedidos-detalles',
  templateUrl: './perfil-pedidos-detalles.html',
  styleUrls: ['./perfil-pedidos-detalles.css']
})
export class PerfilPedidosDetallesComponent {
  totalPedidos = 0;
  mesa = {};
  pedidos = [];
  detalles_pedidos = [];
  cuenta = 0;
  noHayPedidos: boolean = false;  

  public constructor(private router: Router, private page: Page, private pedidoService: PedidoService, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const user_id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.pedidoService.obtenerPedidos(user_id).subscribe((data: any) => {
        this.totalPedidos = data.total_pedidos;
        this.mesa = data.mesa;
        this.detalles_pedidos = data.detalles_pedidos; 
        this.cuenta = data.cuenta
        this.noHayPedidos = !data.hay_pedidos;
    });
  }

  public onCancelarPedido(id_pedido){
    const options: ModalDialogOptions = {
      context: {
      item: false,
    },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalEliminarPedidoComponent, options).then((result: boolean) => {
      if (result) {
        console.log('Eliminar Pedido');      
        this.pedidoService.eliminarPedido(id_pedido).subscribe((res: any) => {
          if (res) {
              console.log(res.message);
              Dialogs.alert({
                  title: 'Respuesta:',
                  message: 'Pedido cancelado exitosamente!',
                  okButtonText: 'OK',
                  cancelable: true,
              });

              this.router.navigate(['perfil']);
          }
          }, error => {
              console.log(error.error);
              Dialogs.alert({
                  title: 'Respuesta:',
                  message: error.error.message,
                  okButtonText: 'OK',
                  cancelable: true,
              });
          });  
        }
    });
  }


  public onEliminarProducto(id_detalle){
    const options: ModalDialogOptions = {
      context: {
      item: true,
    },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalEliminarPedidoComponent, options).then((result: boolean) => {
      if (result) {
        console.log('Eliminar Producto');
        this.pedidoService.eliminarProductoPedido(id_detalle).subscribe((res: any) => {
          console.log(res);
          
          if (res.message) {
              console.log(res.message);
              Dialogs.alert({
                  title: 'Respuesta:',
                  message: 'Producto eliminado exitosamente!',
                  okButtonText: 'OK',
                  cancelable: true,
              });
      
              this.router.navigate(['perfil']);
          }
      }, error => {
          console.log(error.error); 
          Dialogs.alert({
              title: 'Respuesta:',
              message: error.error.message || 'Error eliminando producto',
              okButtonText: 'OK',
              cancelable: true,
          });
      });
      }
    });
  }


  public onMotivoCancelacionPedido(comentario){
    const options: ModalDialogOptions = {
      context: {
      item: false,
      motivo_eliminacion: comentario
    },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalMotivoEliminacionComponent, options).then((result: boolean) => {
      if (result) {
        console.log('Viendo motivo eliminación pedido');        
      }
    });
  }


  public onMotivoEliminacionProducto(motivo_eliminacion){
    const options: ModalDialogOptions = {
      context: {
      item: true,
      motivo_eliminacion: motivo_eliminacion
    },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalMotivoEliminacionComponent, options).then((result: boolean) => {
      if (result) {
        console.log('Viendo motivo eliminación producto');        
      }
    });
  }


  public onPagarCuenta(codigo_mesa){
    const id_usuario = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.pedidoService.pagarPedido(id_usuario, codigo_mesa).subscribe((res: any) => {
      if (res) {
        console.log(res.message);
        Dialogs.alert({
            title: 'Respuesta:',
            message: res.message,
            okButtonText: 'OK',
            cancelable: true,
        });

        this.router.navigate(['/perfil']);
    }}, error => {
    console.log(error.error);
    Dialogs.alert({
        title: 'Respuesta:',
        message: error.error.message,
        okButtonText: 'OK',
        cancelable: true,
    });
  })
  }

  public onLiberarMesa(codigo_mesa){
    this.pedidoService.liberarMesa(codigo_mesa).subscribe((res: any) => {
      if (res) {
        console.log(res.message);
        Dialogs.alert({
            title: 'Respuesta:',
            message: res.message,
            okButtonText: 'OK',
            cancelable: true,
        });

        this.router.navigate(['/perfil']);
    }}, error => {
    console.log(error.error);
    Dialogs.alert({
        title: 'Respuesta:',
        message: error.error.message,
        okButtonText: 'OK',
        cancelable: true,
    });
  })
  }


  onQrMesa() {
    this.router.navigate(['qr_mesa'])
  }

  
  public onNuevoPedido(codigo_qr, mesa){
    this.router.navigate(["pedido", codigo_qr, mesa]);
  }


  public onTap(){
    this.router.navigate(["perfil"])
  }

  formatDate(fecha: string): string {
    const date = new Date(fecha);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year} a las ${hours}:${minutes}`;
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
