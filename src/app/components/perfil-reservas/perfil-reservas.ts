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

  public constructor(private router: Router, private page: Page, private eventoService: EventoService) {

  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.eventoService.obtenerReservasUsuario(id).subscribe((data: any) => {
        console.log(data);
        this.reservas = data.reservas;
    });
  }

  public onTap(){
    this.router.navigate(["perfil"])
  }

  getFullImageUrl(foto: string): string {
    return `${global.urlLocalSayi}${foto}`;
  }
}
