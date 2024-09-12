import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { Dialogs } from '@nativescript/core'
import { EventoService } from '../../shared/services/evento.service';


@Component({
  selector: 'evento',
  templateUrl: './evento.html',
  styleUrls: ['./evento.css'],
})
export class EventoComponent {
  eventos: any[];
  public constructor(private router: Router, private eventoService: EventoService, private page: Page) {
    this.obtenerTodos();
  }

  public obtenerTodos(){
    this.eventoService.obtenerEventos().subscribe((data: any[]) => {
        this.eventos = data;
    }); 
  }


  onItemTap(item: any) {
    let register = item

    this.eventoService.getRegisterById(register.id).subscribe((res) => {
        Dialogs.alert({
            title: 'Detalles!',
            message: `ID: ${res.id}\nNOMBRE: ${res.nombre}\nFECHA: ${res.fecha}\nHORA INICIO: ${res.hora_incio}\nDESCRIPCION: ${res.descripcion}\nFOTO: ${res.foto}`,
            okButtonText: 'OK',
            cancelable: true,
        });
        console.info(res)
    });
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"]);
  }
  public onVerMas() {
    this.router.navigate(["info_evento"]);
  }
}
