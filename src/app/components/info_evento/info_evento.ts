import { Component } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { EventoService } from '../../shared/services/evento.service';

@Component({
  selector: 'info_evento',
  templateUrl: './info_evento.html',
  styleUrls: ['./info_evento.css'],
})
export class InfoEventoComponent {
  public info_evento = {}
  public constructor(private router: Router, private page: Page, private eventoService: EventoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = this.route.snapshot.params.id
    this.eventoService.obtenerEventoPorId(id).subscribe((evento: any) => {
      console.log(evento);
      this.info_evento = evento;
    }); 
  }

  public onTap(){
    this.router.navigate(["evento"]);
  }
  public onCarrito(){
    this.router.navigate(["evento_carrito"]);
  }
}