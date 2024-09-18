import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class PedidoService {

    headers = {"Authorization": `Token ${localStorage.getItem('Oasis.token')}`}

    constructor(private http: HttpClient) { }

    realizarPedido(data: any): Observable<any> {
        return this.http.post<any>(`${global.urlLocalSayi}/api/1.0/realizar_pedido/`, data, { headers: this.headers });
    }

    obtenerPedidos(id: number): Observable<any[]>{
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/pedidos_usuario/${id}/`, {headers: this.headers});
    }

    eliminarPedido(id_pedido: number): Observable<any[]>{
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/eliminar_pedido_usuario/${id_pedido}/`, {headers: this.headers});
    }

    eliminarProductoPedido(id_detalle: number): Observable<any[]>{
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/eliminar_producto_pedido_usuario/${id_detalle}/`, {headers: this.headers});
    }
  
}