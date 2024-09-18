import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-eliminar-pedido',
  templateUrl: './modal-eliminar-pedido.html',
  styleUrls: ['./modal-eliminar-pedido.css'],
})

export class ModalEliminarPedidoComponent {
    public item: boolean;
    public id_pedido: number;


  constructor(private params: ModalDialogParams) {
    const { item, id_pedido } = params.context;

    this.item = item;
    this.id_pedido = id_pedido;
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