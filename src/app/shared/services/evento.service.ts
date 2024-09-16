import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

    headers = {"Authorization": "Token "+ localStorage.getItem('Oasis.token')}
    
    constructor(private http: HttpClient) { }

    obtenerEventos(): Observable<any[]> {
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/evento/`, { headers: this.headers});
    }

    obtenerEventoPorId(id: number): Observable<any> {
        return this.http.get<any>(`${global.urlLocalSayi}/api/1.0/evento/${id}/`, { headers: this.headers });
    }

    comprarEntradas(data: any): Observable<any> {
        return this.http.post<any>(`${global.urlLocalSayi}/api/1.0/comprar_entradas/`, data, { headers: this.headers });
    }

    obtenerEntradasUsuario(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/entradas_usuario/${id}/`, { headers: this.headers });
    }

    obtenerEntradasDetallesUsuario(user_id: number, entrada_id: number): Observable<any[]> {
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/entradas_detalles_usuario/${user_id}/${entrada_id}/`, { headers: this.headers });
    }

    reservarMesa(data: any): Observable<any> {
        return this.http.post<any>(`${global.urlLocalSayi}/api/1.0/reservar_mesa/`, data, { headers: this.headers });
    }

    obtenerReservasUsuario(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/reservas_usuario/${id}/`, { headers: this.headers });
    }

    obtenerReservasDetallesUsuario(user_id: number, reserva_id: number): Observable<any[]> {
        return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/reservas_detalles_usuario/${user_id}/${reserva_id}/`, { headers: this.headers });
    }
}
