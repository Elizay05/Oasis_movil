import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-reservas',
  templateUrl: './modal-reservas.html',
  styleUrls: ['./modal-reservas.css'],
})

export class ModalReservasComponent {
  public fotoEvento: string;
  public nombreEvento: string;
  public nombreMesa: string;
  public capacidadMesa: number;
  public total: number;


  constructor(private params: ModalDialogParams) {
    const { fotoEvento, nombreEvento, nombreMesa, capacidadMesa, total } = params.context;

    this.fotoEvento = fotoEvento;
    this.nombreEvento = nombreEvento;
    this.nombreMesa = nombreMesa;
    this.capacidadMesa = capacidadMesa;
    this.total = total;
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