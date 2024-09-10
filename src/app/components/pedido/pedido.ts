import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page, TextField } from '@nativescript/core';
import { MesaService } from '../../shared/services/mesa.service';

@Component({
  selector: 'pedido',
  templateUrl: './pedido.html',
  styleUrls: ['./pedido.css'],
})
export class PedidoComponent {
  mesa = {}

  public constructor(private router: Router, private page: Page, private mesaService: MesaService) {
    // Use the component constructor to inject providers.
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.mesa = this.mesaService.mesa
  }
  public onTap(){
    this.router.navigate(["qr_mesa"]);
  }
}