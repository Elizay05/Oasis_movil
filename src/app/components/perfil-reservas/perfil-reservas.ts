import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { EventoService } from '~/app/shared/services/evento.service';


@Component({
  selector: 'perfil-reservas',
  templateUrl: './perfil-reservas.html',
  styleUrls: ['./perfil-reservas.css']

  
})
export class PerfilReservasComponent {
    reservas: any[];
    hayReservas: boolean = false

  public constructor(private router: Router, private page: Page, private eventoService: EventoService) {

  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.eventoService.obtenerReservasUsuario(id).subscribe((data: any) => {
      if (data.reservas && data.reservas.length > 0) {
        this.reservas = data.reservas;
        this.hayReservas = true;
      } else {
        this.hayReservas = false;
      }
    });
  }

  public onReservar(){
    this.router.navigate(["evento"])
  }
  public onTap(){
    this.router.navigate(["perfil"])
  }

  getFullImageUrl(foto: string): string {
    return `${global.url}${foto}`;
  }
}
