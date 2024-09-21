import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-reserva-escaneado',
  templateUrl: './modal-reserva-escaneado.html',
  styleUrls: ['./modal-reserva-escaneado.css'],
})

export class ModalReservaEscaneadoComponent {
    public reserva: any = {};


  constructor(private params: ModalDialogParams) {
    const { reserva } = params.context;

    this.reserva = reserva;
  }

  confirmar() {
    this.params.closeCallback(true);
  }

  getFullImageUrl(foto: string): string {
    return `${global.urlLocalSayi}${foto}`;
  }

}