import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = 'https://elizay05.pythonanywhere.com/api/1.0/';

    // Incluir aquí tu token de autenticación
    authToken = 'c2f9d0d7766f1ebc39a3e01a1a4e252e10472ed9';

    constructor(private http: HttpClient) {}

    private setHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Token ${this.authToken}`
        });
    }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}producto/`, { headers: this.setHeaders() });
    }

    getRegisterById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}producto/${id}/`, { headers: this.setHeaders() });
    }

    addRegister(post: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}producto/`, post, { headers: this.setHeaders() });
    }

    updateRegister(id: number, post: any): Observable<any> {
        console.log(`datos: ${post.nombre_cat} - ${post.desc}`);
        return this.http.put<any>(`${this.apiUrl}producto/${id}/`, post, { headers: this.setHeaders() });
    }

    deleteRegister(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}producto/${id}/`, { headers: this.setHeaders() });
    }
}
