import { Component } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { EventoService } from '../../shared/services/evento.service';
import { GaleriaService } from '~/app/shared/services/galeria.service';


@Component({
  selector: 'galeria-fotos',
  templateUrl: './galeria-fotos.html',
  styleUrls: ['./galeria-fotos.css']
})
export class GaleriaFotosComponent {
  fotos: any[] = [];
  public constructor(private router: Router, private galeriaService: GaleriaService, private page: Page, private route: ActivatedRoute) {
    this.obtenerFotos();
  }

  public obtenerFotos(){
    const id = this.route.snapshot.params.id
    this.galeriaService.obtenerFotos(id).subscribe((data: any) => {
        this.fotos = data.fotos;
    }); 
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"]);
  }
}
