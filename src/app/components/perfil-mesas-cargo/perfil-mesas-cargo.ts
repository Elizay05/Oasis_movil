import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { MesaService } from '~/app/shared/services/mesa.service';


@Component({
  selector: 'perfil-mesas-cargo',
  templateUrl: './perfil-mesas-cargo.html',
  styleUrls: ['./perfil-mesas-cargo.css'],
})
export class PerfilMesasCargoComponent {
  mesas: any[] = [];
  public constructor(private router: Router, private page: Page, private mesaService: MesaService) {
  }  
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const id_usuario = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.mesaService.obtenerMesasCargo(id_usuario).subscribe((data: any) => {
        console.log(data);
        this.mesas = data.mesas;
    })
  }

  public onTap(){
    this.router.navigate(["perfil"]);
  }
}
