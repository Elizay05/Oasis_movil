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
}
