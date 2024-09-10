import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MesaService {

    url = "http://127.0.0.1:8000/api/1.0/url_prueba/"

    mesa = {}
    headers = {"Authorization": `Token ${localStorage.getItem('Oasis.token')}`}

    constructor(private http: HttpClient) { }
  
    activarMesa(data: any): Observable<any> {
      return this.http.post<any>(`${global.apiUrl}token_qr/`, data);
    }

    obtenerMesa(data: any): Observable<any> {
      return this.http.get<any>(`${global.apiUrl}token_qr/${data.mesa}/${data.email}/`, {headers: this.headers});
    }

    urlPrueba(nombre: any): Observable<any> {
      return this.http.post<any>(`${this.url}`, nombre, {headers: {"Authorization": `Token f9c0f70d26cf197fe4d760c48ee9fea9b4942e99`}});
    }
  }