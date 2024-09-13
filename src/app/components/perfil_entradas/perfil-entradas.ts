import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { EventoService } from '~/app/shared/services/evento.service';


@Component({
  selector: 'perfil-entradas',
  templateUrl: './perfil-entradas.html',
  styleUrls: ['./perfil-entradas.css']

  
})
export class PerfilEntradasComponent {
    entradas: any[];

  public constructor(private router: Router, private page: Page, private eventoService: EventoService) {

  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.eventoService.obtenerEntradasUsuario(id).subscribe((data: any) => {
        console.log(data);
        this.entradas = data.entradas;
    });
  }

  onDetalles(id: number) {
    this.router.navigate(["perfil/entradas/detalles/", id]);
  }
  public onTap(){
    this.router.navigate(["home"])
  }

  getFullImageUrl(foto: string): string {
    return `${global.urlLocalSayi}${foto}`;
  }
}
