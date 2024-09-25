import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class GaleriaService {

    headers = {"Authorization": `Token ${localStorage.getItem('Oasis.token')}`}

    constructor(private http: HttpClient) { }
    
    obtenerGalerias(): Observable<any[]> {
      return this.http.get<any[]>(`${global.url}/api/1.0/galeria/`, {headers: this.headers});
    }

    obtenerFotos(id_carpeta: number): Observable<any[]> {
      return this.http.get<any[]>(`${global.url}/api/1.0/galeria_fotos/${id_carpeta}/`, {headers: this.headers});
    }
}