import { Component, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { ModalDialogService, ModalDialogOptions } from '@nativescript/angular';
import { ModalQrComponent } from '../modal-qr/modal-qr';
import { EventoService } from '~/app/shared/services/evento.service';



@Component({
  selector: 'perfil-reservas-detalles',
  templateUrl: './perfil-reservas-detalles.html',
  styleUrls: ['./perfil-reservas-detalles.css']
})
export class PerfilReservasDetallesComponent {

    evento: any = {};
    reserva: any = {};
    mesa: any = {};
    capacidadMesa: number = 0;


  public constructor(private router: Router, private page: Page, private eventoService: EventoService, private route: ActivatedRoute, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const user_id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    const reserva_id = this.route.snapshot.params.id
    this.eventoService.obtenerReservasDetallesUsuario(user_id, reserva_id).subscribe((data: any) => {
        this.evento = data.evento;
        this.reserva = data.reserva;
        this.mesa = data.mesa;
        this.capacidadMesa = data.capacidad_mesa;
        this.reserva.fecha_compra = this.formatDate(this.reserva.fecha_compra);
    })
  }

  public onQr(fotoQr){
    const options: ModalDialogOptions = {
      context: {
        fotoQr: fotoQr,
      },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalQrComponent, options);
  }
  public onTap(){
    this.router.navigate(["perfil/reservas"])
  }

  formatDate(fecha: string): string {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
