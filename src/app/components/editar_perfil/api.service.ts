import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    apiUrl = 'https://elizay05.pythonanywhere.com/api/1.0'; // Asegúrate de que esta es la URL base correcta
    authToken = '0feb642ec2305e8620a94d26722dc45abda11b3c'; // Token de autenticación
  
    constructor(private http: HttpClient) { }
  
    private getHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.authToken}`
      });
    }
  
    // Método para actualizar el perfil del usuario
    public actualizarPerfil(id: number, nombre: string, email: string, foto: string): Observable<any> {
      const perfilActualizado = {
        nombre: nombre,
        email: email,
        foto: foto
      };
      return this.http.put(`${this.apiUrl}/usuarios/${id}/update`, perfilActualizado, { headers: this.getHeaders() });
    }
  }
  
