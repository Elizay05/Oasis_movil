import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = 'http://192.168.1.10:8000/Oasis/api/1.0/'; // Replace with your registration endpoint URL

    constructor(private http: HttpClient) {}

    registrarUsuario(post: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token 7dbbf758a5f9883815db1a34d528f547950947d7'
        });

        return this.http.post<any>(`${this.apiUrl}usuario/`, post, { headers });
    }

    obtenerUrlImage(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Token 7dbbf758a5f9883815db1a34d528f547950947d7'
        });
        return this.http.get<any>(`${this.apiUrl}usuarios/${id}/foto`, { headers });
    }

    obtenerFotoUsuario(userId: number): Observable<string> {
        const url = `http://192.168.1.10:8000/tienda/Img_usuarios/${userId}.png`; // Cambia userId según necesites
        return this.http.get<string>(url);
    }
}
