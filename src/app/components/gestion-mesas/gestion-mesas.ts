import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { MesaService } from '~/app/shared/services/mesa.service';


@Component({
  selector: 'gestion-mesas',
  templateUrl: './gestion-mesas.html',
  styleUrls: ['./gestion-mesas.css'],
})
export class GestionMesasComponent {
  mesas: any[];
  public constructor(private router: Router, private page: Page, private mesaService: MesaService) {
  }  
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.mesaService.obtenerMesas().subscribe((data: any[]) => {
        this.mesas = data;
    })
  }


  public activarMesa(codigo_qr, mesa){
    this.router.navigate(["pedido", codigo_qr, mesa]);
  }

  public onTap(){
    this.router.navigate(["home"]);
  }
}
