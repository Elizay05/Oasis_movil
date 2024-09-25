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
    hayEntradas: boolean = false

  public constructor(private router: Router, private page: Page, private eventoService: EventoService) {

  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.eventoService.obtenerEntradasUsuario(id).subscribe((data: any) => {
        if (data.entradas && data.entradas.length > 0) {
          this.entradas = data.entradas;
          this.hayEntradas = true;
        } else {
          this.hayEntradas = false;
        }
    });
  }

  public onComprarEntradas(){
    this.router.navigate(["evento"])
  }

  public onTap(){
    this.router.navigate(["perfil"])
  }

  getFullImageUrl(foto: string): string {
    return `${global.url}${foto}`;
  }
}
