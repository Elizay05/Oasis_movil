import { Component } from '@angular/core'
import { Router } from "@angular/router"; 
import { Page } from '@nativescript/core';
import { PedidoService } from '~/app/shared/services/pedido.service';



@Component({
  selector: 'perfil-pedidos-detalles',
  templateUrl: './perfil-pedidos-detalles.html',
  styleUrls: ['./perfil-pedidos-detalles.css']
})
export class PerfilPedidosDetallesComponent {
  totalPedidos = 0;
  mesa = {};
  pedidos = [];
  detalles_pedidos = [];
  cuenta = 0;

  public constructor(private router: Router, private page: Page, private pedidoService: PedidoService) {
  }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    const user_id = JSON.parse(localStorage.getItem('Oasis.user')).user_id
    this.pedidoService.obtenerPedidos(user_id).subscribe((data: any) => {
        this.totalPedidos = data.total_pedidos;
        this.mesa = data.mesa;
        this.detalles_pedidos = data.detalles_pedidos; 
        this.cuenta = data.cuenta
    });
  }

  public onTap(){
    this.router.navigate(["perfil"])
  }

  formatDate(fecha: string): string {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
