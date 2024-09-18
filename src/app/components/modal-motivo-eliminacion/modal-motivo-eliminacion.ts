import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';

@Component({
  selector: 'modal-motivo-eliminacion',
  templateUrl: './modal-motivo-eliminacion.html',
  styleUrls: ['./modal-motivo-eliminacion.css'],
})

export class ModalMotivoEliminacionComponent {
    public motivoEliminacion: string;
    public item: boolean;


  constructor(private params: ModalDialogParams) {
    const { motivo_eliminacion, item } = params.context;

    this.motivoEliminacion = motivo_eliminacion;
    this.item = item;
  }

  confirmar() {
    this.params.closeCallback(true);
  }
}