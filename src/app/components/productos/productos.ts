import { Component, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { ProductoService } from '~/app/shared/services/producto.service';
import { ModalProductosComponent } from '../modal-productos/modal-productos';



@Component({
  selector: 'productos',
  templateUrl: './productos.html',
  styleUrls: ['./productos.css'],
})
export class ProductosComponent {
  productos: any = [];
  
  public constructor(private router: Router, private page: Page, private route: ActivatedRoute, private productoService: ProductoService, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.productoService.obtenerProductos().subscribe((data: any) => {
      console.log(data)
      this.productos = data
    })
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

    this.modalService.showModal(ModalProductosComponent, options).then((result: boolean) => {
      if (result) {
        console.log('se vió el producto')
      }
    })
  }

  public onTap(){
    this.router.navigate(["home"]);
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
