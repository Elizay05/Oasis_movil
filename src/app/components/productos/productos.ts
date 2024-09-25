import { Component, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { ProductoService } from '~/app/shared/services/producto.service';
import { ModalProductosComponent } from '../modal-productos/modal-productos';
import { PedidoService } from '~/app/shared/services/pedido.service';



@Component({
  selector: 'productos',
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
})
export class ProductosComponent {
  productos: any = [];

  perfil;
  pedidos = false
  mesa: any = {};
  
  public constructor(private router: Router, private page: Page, private route: ActivatedRoute, private productoService: ProductoService, private pedidoService: PedidoService, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.perfil = JSON.parse(localStorage.getItem('Oasis.user'))

    this.productoService.obtenerProductos().subscribe((data: any) => {
      this.productos = data
    })

    this.pedidoService.verificarPedidoUsuario(this.perfil.user_id).subscribe((res: any) => {
      this.pedidos = res.pedidos
      this.mesa = res.mesa
    });
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

  onRealizarPedido() {
    if (this.pedidos){
      this.router.navigate(['pedido', this.mesa.codigo_qr, this.mesa.nombre])
    }else{
      this.router.navigate(['qr_mesa'])
    }
  }


  public onTap(){
    this.router.navigate(["home"]);
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
