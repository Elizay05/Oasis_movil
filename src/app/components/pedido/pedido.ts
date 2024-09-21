import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { Dialogs, Page, TextField } from '@nativescript/core';
import { ProductoService } from '~/app/shared/services/producto.service';
import { ModalPedidosComponent } from '../modal-pedidos/modal-pedidos';
import { PedidoService } from '~/app/shared/services/pedido.service';


@Component({
  selector: 'pedido',
  templateUrl: './pedido.html',
  styleUrls: ['./pedido.css'],
})
export class PedidoComponent {
  mesa: string;
  codigo_qr: string;
  usuario: any = {};

  productos: any = [];
  productosSeleccionados: any = [];
  total: number = 0;

  comentario: string = '';

  public constructor(private router: Router, private page: Page, private route: ActivatedRoute, private productoService: ProductoService, private pedidoService: PedidoService, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.mesa = this.route.snapshot.params.mesa
    this.codigo_qr = this.route.snapshot.params.id
    this.usuario = JSON.parse(localStorage.getItem('Oasis.user'))
    

    this.productoService.obtenerProductos().subscribe((data: any) => {
      console.log("Productos recibidos: ", data);
        this.productos = data.map(p => ({ ...p, cantidad: 0, subtotal: 0 }));
        console.log("Array de productos: ", this.productos);
    });

  }


  incrementarCantidad(producto: any): void {
    producto.cantidad += 1;
    this.actualizarProductosSeleccionados();
  }

  decrementarCantidad(producto: any): void {
    if (producto.cantidad > 0) {
        producto.cantidad -= 1;
    }
    this.actualizarProductosSeleccionados();
  }

  actualizarProductosSeleccionados(): void {
    this.productosSeleccionados = this.productos.filter(p => p.cantidad > 0);
    this.total = 0;
    this.productosSeleccionados.forEach(p => {
      p.subtotal = p.cantidad * p.precio; // Calcula el subtotal
      this.total += p.subtotal; // Acumula el total general
    });
    console.log("Productos seleccionados: ", this.productosSeleccionados);
    console.log("Total general: ", this.total);
  }


  onCommentChange(event: any): void {
    this.comentario = event.object.text;
  }


  onHacerPedido() {
    const options: ModalDialogOptions = {
      context: {
        nombreMesa: this.mesa,
        productos : this.productosSeleccionados,
        total: this.total,
        comentario : this.comentario  
      },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalPedidosComponent, options).then((result: boolean) => {
      if (result) {
        console.log('pedido confirmado'); 
        let data = {
          id_usuario: JSON.parse(localStorage.getItem('Oasis.user')).user_id,
          codigo_mesa: this.codigo_qr,
          comentario: this.comentario,
          total: this.total,
          productos_seleccionados: this.productosSeleccionados
        }
        console.log(data);

        this.pedidoService.realizarPedido(data).subscribe((res: any) => {
            if (res) {
                console.log(res.message);
                Dialogs.alert({
                    title: 'Respuesta:',
                    message: 'Pedido realizado exitosamente!',
                    okButtonText: 'OK',
                    cancelable: true,
                });

                this.router.navigate(['/home']);
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
      } else {
        console.log('pedido cancelado');
      }
    });
  }


  public onTap(){
    this.router.navigate(["home"]);
  }

  
  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}