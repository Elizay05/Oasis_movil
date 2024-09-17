import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-pedidos',
  templateUrl: './modal-pedidos.html',
  styleUrls: ['./modal-pedidos.css'],
})

export class ModalPedidosComponent {
  public nombreMesa: string;
  public productos: any = [];
  public total: number = 0;
  public comentario: string = '';

  constructor(private params: ModalDialogParams) {
    const { nombreMesa, productos, total, comentario } = params.context;

    this.nombreMesa = nombreMesa;
    this.productos = productos;
    this.total = total;
    this.comentario = comentario;
  }

  confirmar() {
    this.params.closeCallback(true);
  }

  cancelar() {
    this.params.closeCallback(false);
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}