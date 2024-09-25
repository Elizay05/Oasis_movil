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
        return this.http.post<any>(`${global.url}/api/1.0/realizar_pedido/`, data, { headers: this.headers });
    }

    obtenerPedidos(id: number): Observable<any[]>{
        return this.http.get<any[]>(`${global.url}/api/1.0/pedidos_usuario/${id}/`, {headers: this.headers});
    }

    eliminarPedido(id_pedido: number): Observable<any[]>{
        return this.http.get<any[]>(`${global.url}/api/1.0/eliminar_pedido_usuario/${id_pedido}/`, {headers: this.headers});
    }

    eliminarProductoPedido(id_detalle: number): Observable<any[]>{
        return this.http.get<any[]>(`${global.url}/api/1.0/eliminar_producto_pedido_usuario/${id_detalle}/`, {headers: this.headers});
    }
  
    pagarPedido(id_usuario: number, codigo_mesa: string): Observable<any[]>{
        return this.http.get<any[]>(`${global.url}/api/1.0/pagar_pedido_usuario/${id_usuario}/${codigo_mesa}/`, {headers: this.headers});
    }

    liberarMesa(codigo_mesa: string): Observable<any[]>{
        return this.http.get<any[]>(`${global.url}/api/1.0/liberar_mesa_usuario/${codigo_mesa}/`, {headers: this.headers});
    }

    verificarPedidoUsuario(id_usuario: number): Observable<any[]>{
        return this.http.get<any[]>(`${global.url}/api/1.0/verificar_pedido_usuario/${id_usuario}/`, {headers: this.headers});
    }

    obtenerPedidosMesa(codigo_mesa: string): Observable<any[]>{
        return this.http.get<any[]>(`${global.url}/api/1.0/pedidos_mesa/${codigo_mesa}/`, {headers: this.headers});
    }
}