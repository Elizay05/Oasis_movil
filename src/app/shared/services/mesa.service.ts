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
  
    activarMesa(data: any): Observable<any> {
      return this.http.post<any>(`${global.apiUrl}token_qr/`, data);
    }

    obtenerMesa(data: any): Observable<any> {
      return this.http.post<any>(`${global.apiUrl}token_qr/`, data, {headers: this.headers});
    }
  }