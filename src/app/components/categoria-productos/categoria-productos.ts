import { Component, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { CategoriaService } from '~/app/shared/services/categoria.service';
import { ModalProductosComponent } from '../modal-productos/modal-productos';



@Component({
  selector: 'categoria-productos',
  templateUrl: './categoria-productos.html',
  styleUrls: ['./categoria-productos.css'],
})
export class CategoriaProductosComponent {
  categoria = {}
  productos = []
  
  public constructor(private router: Router, private page: Page, private route: ActivatedRoute, private categoriaService: CategoriaService, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = this.route.snapshot.params.id
    this.categoriaService.obtenerCategoria(id).subscribe((data: any) => {
      this.categoria = data;
    }); 

    this.categoriaService.obtenerCategoriaProductos(id).subscribe((data: any) =>{
      this.productos = data.productos;
      console.log(this.productos)
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
