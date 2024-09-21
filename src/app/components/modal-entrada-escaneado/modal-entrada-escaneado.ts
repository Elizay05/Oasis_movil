import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-entrada-escaneado',
  templateUrl: './modal-entrada-escaneado.html',
  styleUrls: ['./modal-entrada-escaneado.css'],
})

export class ModalEntradaEscaneadoComponent {
    public entrada: any = {};


  constructor(private params: ModalDialogParams) {
    const { entrada } = params.context;

    this.entrada = entrada;
  }

  confirmar() {
    this.params.closeCallback(true);
  }

  getFullImageUrl(foto: string): string {
    return `${global.urlLocalSayi}${foto}`;
  }
}