import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = 'https://elizay05.pythonanywhere.com/api/1.0/'; // Replace with your registration endpoint URL

    constructor(private http: HttpClient) {}

    registrarUsuario(post: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token 0feb642ec2305e8620a94d26722dc45abda11b3c'
        });

        return this.http.post<any>(`${this.apiUrl}usuario/`, post, { headers });
    }

    obtenerUrlImage(id: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Token 0feb642ec2305e8620a94d26722dc45abda11b3c'
        });
        return this.http.get<any>(`${this.apiUrl}usuarios/${id}/foto`, { headers });
    }

    obtenerFotoUsuario(userId: number): Observable<string> {
        const url = `https://elizay05.pythonanywhere.com/Oasis/Img_usuarios/${userId}.png`; // Cambia userId según necesites
        return this.http.get<string>(url);
    }
}
