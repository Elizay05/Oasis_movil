import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = 'http://10.171.68.190:8000/api/1.0/token-auth/';
    headers = {"Authorization": "Token "+ localStorage.getItem('Oasis.token')}

    constructor(private http: HttpClient) {}

    login(datos: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, datos);
    }
    getRegisterById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}login/${id}/`, {headers: this.headers});
    }

    addRegister(post: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}login/`, post, {headers: this.headers});
    }

    updateRegister(id: number, post: any): Observable<any> {
        console.log(`datos: ${post.nombre_cat} - ${post.desc}`);
        return this.http.put<any>(`${this.apiUrl}login/${id}/`, post,{headers: this.headers});
    }

    deleteRegister(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}login/${id}/`,{headers: this.headers});
    }
    obtenerUrlImage(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}usuarios/${id}/foto`, {headers: this.headers});
    }
    obtenerFotoUsuario(userId: number): Observable<string> {
        const url = `http://192.168.1.10:8000/tienda/Img_usuarios/${userId}.png`; // Cambia userId según necesites
        return this.http.get<string>(url);
    }
    eliminarUsuario(email: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/usuarios/${email}`);
      }
}