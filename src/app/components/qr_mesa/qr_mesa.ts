import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page, TextField } from '@nativescript/core';

@Component({
  selector: 'qr_mesa',
  templateUrl: './qr_mesa.html',
  styleUrls: ['./qr_mesa.css'],
})
export class QrMesaComponent {
  public constructor(private router: Router, private page: Page) {
    // Use the component constructor to inject providers.
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }
  public onTap(){
    this.router.navigate(["home"]);
  }
  public onEscaneado(){
    this.router.navigate(["pedido"]);
  }
}