import { Component, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { EventoService } from '~/app/shared/services/evento.service';
import { ModalDialogService, ModalDialogOptions } from '@nativescript/angular';
import { ModalQrComponent } from '../modal-qr/modal-qr';



@Component({
  selector: 'perfil-entradas-detalles',
  templateUrl: './perfil-entradas-detalles.html',
  styleUrls: ['./perfil-entradas-detalles.css']
})
export class PerfilEntradasDetallesComponent {

    qr_entradas: any[] = [];
    evento: any = {};
    compra_entrada: any = {};


  public constructor(private router: Router, private page: Page, private eventoService: EventoService, private route: ActivatedRoute, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const user_id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    const entrada_id = this.route.snapshot.params.id
    this.eventoService.obtenerEntradasDetallesUsuario(user_id, entrada_id).subscribe((data: any) => {
        this.qr_entradas = data.qr_entradas;
        this.evento = data.evento;
        this.compra_entrada = data.compra_entrada;
        this.compra_entrada.fecha_compra = this.formatDate(this.compra_entrada.fecha_compra);
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

    this.modalService.showModal(ModalQrComponent, options)
  } 
  
  public onTap(){
    this.router.navigate(["perfil/entradas"])
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
