import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-productos',
  templateUrl: './modal-productos.html',
  styleUrls: ['./modal-productos.css'],
})

export class ModalProductosComponent {
  public fotoProducto: string;
  public nombreProducto: string;
  public categoriaProducto: string;
  public precioProducto: number;
  public descripcionProducto: string;

  constructor(private params: ModalDialogParams) {
    const { fotoProducto, nombreProducto, categoriaProducto, precioProducto, descripcionProducto } = params.context;

    this.fotoProducto = fotoProducto;
    this.nombreProducto = nombreProducto;
    this.categoriaProducto = categoriaProducto;
    this.precioProducto = precioProducto;
    this.descripcionProducto = descripcionProducto;
  }

  confirmar() {
    this.params.closeCallback(true);
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}