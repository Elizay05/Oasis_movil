import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '@nativescript/core';
import { EventoService } from '~/app/shared/services/evento.service';
import { ModalDialogService, ModalDialogOptions } from '@nativescript/angular';
import { ModalEntradasComponent } from '~/app/components/modal-entradas/modal-entradas';
import { Dialogs } from '@nativescript/core';


@Component({
  selector: 'evento-entradas',
  templateUrl: './evento_entradas.html',
  styleUrls: ['./evento_entradas.css']
})
export class EventoEntradasComponent {
  // Lógica del componente

  public info_evento: any = {}

  public entradaGeneral = 1;
  public entradaVip = 1;

  public subtotalEntradaGeneral = 0;
  public subtotalEntradaVip = 0;

  public isButtonDisabled = false;

  constructor(private router: Router, private page: Page, private eventoService: EventoService, private route: ActivatedRoute, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = this.route.snapshot.params.id
    this.eventoService.obtenerEventoPorId(id).subscribe((evento: any) => {
      console.log(evento);
      this.info_evento = evento;
      this.calcularSubtotales();
        }); 
  }

  calcularSubtotales() {
    if (this.info_evento && this.info_evento.precio_entrada && this.info_evento.precio_vip) {
      this.subtotalEntradaGeneral = this.entradaGeneral * this.info_evento.precio_entrada;
      this.subtotalEntradaVip = this.entradaVip * this.info_evento.precio_vip;

      this.checkButtonState();
    }
  }

  onEntradaGeneralChange(newValue: number) {
    this.entradaGeneral = newValue;
    this.calcularSubtotales();
  }

  onEntradaVipChange(newValue: number) {
    this.entradaVip = newValue;
    this.calcularSubtotales(); 
  }

  checkButtonState() {
    this.isButtonDisabled = this.entradaGeneral === 0 && this.entradaVip === 0;
  }

  onComprar() {
    const options: ModalDialogOptions = {
      context: {
        fotoEvento: this.info_evento.foto,
        nombreEvento: this.info_evento.nombre,
        cantidadGeneral: this.entradaGeneral,
        cantidadVip: this.entradaVip,
        precioGeneral: this.subtotalEntradaGeneral,
        precioVip: this.subtotalEntradaVip,
      },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalEntradasComponent, options).then((result: boolean) => {
      if (result) {
        console.log('Compra confirmada');
        let data = {
            id_usuario: JSON.parse(localStorage.getItem('Oasis.user')).user_id,
            id_evento: this.info_evento.id,
            cantidad_general: this.entradaGeneral,
            cantidad_vip: this.entradaVip,
            total: this.subtotalEntradaGeneral + this.subtotalEntradaVip
        }
        console.log(data);

        this.eventoService.comprarEntradas(data).subscribe((res: any) => {
            if (res) {
                console.log(res.message);
                Dialogs.alert({
                    title: 'Respuesta:',
                    message: 'Entradas compradas exitosamente!',
                    okButtonText: 'OK',
                    cancelable: true,
                });

                this.router.navigate(['/home']);
            }
        }, error => {
            console.log(error.error);
            Dialogs.alert({
                title: 'Respuesta:',
                message: error.error.message,
                okButtonText: 'OK',
                cancelable: true,
            });
        });
      }
    });
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


  public onTap(){
    this.router.navigate(["evento/info_evento/" + this.info_evento.id ]);
  }
}