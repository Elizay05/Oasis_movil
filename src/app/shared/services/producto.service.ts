import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {

    headers = {"Authorization": `Token ${localStorage.getItem('Oasis.token')}`}

    constructor(private http: HttpClient) { }
    
    obtenerProductos(): Observable<any[]> {
      return this.http.get<any[]>(`${global.urlLocalSayi}/api/1.0/producto/`, {headers: this.headers});
    }

}