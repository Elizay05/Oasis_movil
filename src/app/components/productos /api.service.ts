import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    apiUrl = 'http://10.171.68.190:8000/Oasis/api/1.0/';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}producto/`);
    }

    getRegisterById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}producto/${id}/`);
    }

    addRegister(post: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}producto/`, post);
    }

    updateRegister(id: number, post: any): Observable<any> {
        console.log(`datos: ${post.nombre_cat} - ${post.desc}`);
        return this.http.put<any>(`${this.apiUrl}producto/${id}/`, post);
    }

    deleteRegister(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}producto/${id}/`);
    }
}
