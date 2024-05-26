import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = 'http://192.168.1.10:8000/Oasis/api/1.0/usuario/'; // Replace with your registration endpoint URL
    headers = {"Authorization": "Token "+ localStorage.getItem('Oasis.token')}

    constructor(private http: HttpClient) {}

    registrarUsuario(post: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, post, {headers: this.headers});
    }

    obtenerUrlImage(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}usuarios/${id}/foto`, {headers: this.headers});
    }
    obtenerFotoUsuario(userId: number): Observable<string> {
        const url = `http://192.168.1.10:8000/tienda/Img_usuarios/${userId}.png`; // Cambia userId según necesites
        return this.http.get<string>(url);
    }
}