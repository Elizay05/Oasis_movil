import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://192.168.1.10:8000/api/1.0/'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  eliminarUsuario(email: string): Observable<any> {
    const url = `${this.apiUrl}usuario/${email}`;  // Asegúrate de que esta URL sea correcta y que el endpoint exista
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token 1f59adabe708c3d27a61918441378ec72d2b9123'
    });

    // Usando DELETE y pasando el email en la URL
    return this.http.delete(url, { headers });
  }
}
  // Otros métodos del servicio...

