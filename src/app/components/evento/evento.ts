import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
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
