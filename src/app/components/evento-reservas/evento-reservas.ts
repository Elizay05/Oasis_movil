import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '@nativescript/core';
import { EventoService } from '~/app/shared/services/evento.service';
import { ModalDialogService, ModalDialogOptions } from '@nativescript/angular';
import { ModalReservasComponent } from '../modal-reservas/modal-reservas';
import { Dialogs } from '@nativescript/core';
import { MesaService } from '~/app/shared/services/mesa.service';


@Component({
  selector: 'evento-reservas',
  templateUrl: './evento-reservas.html',
  styleUrls: ['./evento-reservas.css']
})
export class EventoReservasComponent {

  public info_evento: any = {}
  public mesas: any = []

  public options: Array<string>;
  public selectedIndex: number = 0;

  public precioMesa: number = 0;
  public total: number = 0;
  
  public mesaSeleccionada: any = {};

  public isButtonDisabled = false;


  constructor(private router: Router, private page: Page, private eventoService: EventoService, private mesaService: MesaService, private route: ActivatedRoute, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = this.route.snapshot.params.id
    this.eventoService.obtenerEventoPorId(id).subscribe((evento: any) => {
      this.info_evento = evento;
    }); 
    this.mesaService.obtenerMesasReservadas(id).subscribe((data: any) => {
      
      this.options = data.mesas.map((mesa: any) => 
        mesa.reservada ? `${mesa.nombre} (Reservada)` : `${mesa.nombre}`
      );
      
      this.mesas = data.mesas;

      if (data.mesas.length > 0 && !data.mesas[0].reservada) {
          this.precioMesa = data.mesas[0].precio;
          const capacidad = data.mesas[0].capacidad;
          this.total = this.calcularTotal(this.precioMesa, capacidad);
          this.isButtonDisabled = false;
      }
    });
  }

  calcularTotal(precioMesa: number, capacidad: number): number {
    const totalEntradas = this.info_evento.precio_entrada * capacidad;
    return precioMesa + totalEntradas;
  }

  public onMesaChange(event: any): void {
    const index = event.value;
    
    if (this.mesas && this.mesas[index]) {
      this.mesaSeleccionada = this.mesas[index];

      if (this.mesaSeleccionada.reservada) {
        this.isButtonDisabled = true;
        this.total = 0;
      } else {
        this.isButtonDisabled = false;
        this.precioMesa = this.mesaSeleccionada.precio;
        const capacidad = this.mesaSeleccionada.capacidad;
        this.total = this.calcularTotal(this.precioMesa, capacidad);
      }
    }
  }

  onReservar() {
    const options: ModalDialogOptions = {
      context: {
        fotoEvento: this.info_evento.foto,
        nombreEvento: this.info_evento.nombre,
        nombreMesa: this.mesas[this.selectedIndex].nombre,
        capacidadMesa: this.mesas[this.selectedIndex].capacidad,
        total: this.total
      },
      fullscreen: false,
      viewContainerRef: this.viewContainerRef
    };

    this.modalService.showModal(ModalReservasComponent, options).then((result: boolean) => {
      if (result) {
        const estado = JSON.parse(localStorage.getItem('Oasis.user')).estado;
        if (estado === 2) {
          Dialogs.alert({
            title: 'Respuesta:',
            message: 'Eres un usuario bloqueado, no puedes reservar mesas.',
            okButtonText: 'OK',
            cancelable: true,
          });
        } else {
          let data = {
            id_usuario: JSON.parse(localStorage.getItem('Oasis.user')).user_id,
            id_evento: this.info_evento.id,
            id_mesa: this.mesaSeleccionada.id,
            total: this.total
          }
          this.eventoService.reservarMesa(data).subscribe((res: any) => {
            if (res) {
              Dialogs.alert({
                title: 'Respuesta:',
                message: 'Reserva hecha exitosamente!',
                okButtonText: 'OK',
                cancelable: true,
              });

              this.router.navigate(['/home']);
            }
          }, error => {
            Dialogs.alert({
              title: 'Respuesta:',
              message: error.error.message,
              okButtonText: 'OK',
              cancelable: true,
            });
          });
        }
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