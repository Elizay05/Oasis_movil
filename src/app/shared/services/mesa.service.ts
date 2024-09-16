import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MesaService {

    mesa = {}
    headers = {"Authorization": `Token ${localStorage.getItem('Oasis.token')}`}

    constructor(private http: HttpClient) { }

    
    obtenerMesas(): Observable<any[]> {
      return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/mesa/`, {headers: this.headers});
    }

    obtenerMesaQr(mesa: any): Observable<any> {
      return this.http.get<any>(`${global.urlLocalSayi}/api/1.0/token_qr/${mesa}/`, {headers: this.headers});
    }
}