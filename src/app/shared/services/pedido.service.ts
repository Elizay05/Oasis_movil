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
  
}