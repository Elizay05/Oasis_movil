import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-qr',
  templateUrl: './modal-qr.html',
  styleUrls: ['./modal-qr.css'],
})

export class ModalQrComponent {
  public fotoQr: string;

  constructor(private params: ModalDialogParams) {
    const { fotoQr } = params.context;

    this.fotoQr = fotoQr;
  }

  confirmar() {
    this.params.closeCallback(true);
  }
}