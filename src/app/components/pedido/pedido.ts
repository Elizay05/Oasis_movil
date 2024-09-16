import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from "@angular/router"; 
import { Page, TextField } from '@nativescript/core';
import { ProductoService } from '~/app/shared/services/producto.service';

@Component({
  selector: 'pedido',
  templateUrl: './pedido.html',
  styleUrls: ['./pedido.css'],
})
export class PedidoComponent {
  mesa: string;
  codigo_qr: string;
  usuario: string;

  productos: any = [];

  public constructor(private router: Router, private page: Page, private route: ActivatedRoute, private productoService: ProductoService) {
    // Use the component constructor to inject providers.
  }
  ngOnInit(): void {
    this.page.actionBarHidden = true;
    this.mesa = this.route.snapshot.params.mesa
    this.codigo_qr = this.route.snapshot.params.id
    this.usuario = JSON.parse(localStorage.getItem('Oasis.user')).nombre

    this.productoService.obtenerProductos().subscribe((data: any) => {
        console.log(data);
        this.productos = data.productos;
    })

  }
  public onTap(){
    this.router.navigate(["qr_mesa"]);
  }
}