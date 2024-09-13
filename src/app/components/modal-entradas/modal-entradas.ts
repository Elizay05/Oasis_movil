import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-entradas',
  templateUrl: './modal-entradas.html',
  styleUrls: ['./modal-entradas.css'],
})

export class ModalEntradasComponent {
  public fotoEvento: string;
  public nombreEvento: string;
  public cantidadGeneral: number;
  public cantidadVip: number;
  public totalGeneral: number;
  public totalVip: number;
  public totalCompra: number;

  constructor(private params: ModalDialogParams) {
    // Recibimos los datos del componente padre (evento_entradas.component)
    const { fotoEvento, nombreEvento, cantidadGeneral, cantidadVip, precioGeneral, precioVip } = params.context;

    this.fotoEvento = fotoEvento;
    this.nombreEvento = nombreEvento;
    this.cantidadGeneral = cantidadGeneral;
    this.cantidadVip = cantidadVip;
    this.totalGeneral = precioGeneral;
    this.totalVip = precioVip;
    this.totalCompra = this.totalGeneral + this.totalVip;
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