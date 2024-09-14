import { Component, ViewContainerRef } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { EventoService } from '~/app/shared/services/evento.service';
import { ModalDialogService, ModalDialogOptions } from '@nativescript/angular';
import { Dialogs } from '@nativescript/core';
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
        console.log(data);
        this.qr_entradas = data.qr_entradas;
        this.evento = data.evento;
        this.compra_entrada = data.compra_entrada;
    })
  }

  public onQr(fotoQr){
    console.log(fotoQr);
    const options: ModalDialogOptions = {
      context: {
        fotoQr: fotoQr,
      },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalQrComponent, options).then((result: boolean) => {
      if (result) {
        console.log('Viendo Qr');        
      }
    });
  }
  public onTap(){
    this.router.navigate(["home"])
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
