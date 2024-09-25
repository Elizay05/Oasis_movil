import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class CategoriaService {

    headers = {"Authorization": `Token ${localStorage.getItem('Oasis.token')}`}

    constructor(private http: HttpClient) { }
    
    obtenerCategorias(): Observable<any[]> {
      return this.http.get<any[]>(`${global.url}/api/1.0/categoria/`, {headers: this.headers});
    }

    obtenerCategoria(id_categoria: number): Observable<any[]>{
      return this.http.get<any[]>(`${global.url}/api/1.0/categoria/${id_categoria}/`, {headers: this.headers});
    }

    obtenerCategoriaProductos(id_categoria: number): Observable<any[]>{
      return this.http.get<any[]>(`${global.url}/api/1.0/categoria_productos/${id_categoria}/`, {headers: this.headers});
    }
}