import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    headers = {"Authorization": "Token "+ localStorage.getItem('Oasis.token')}

    constructor(private http: HttpClient) {}

    login(datos: any): Observable<any> {
        return this.http.post<any>(`${global.urlLocalSayi}/api/1.0/token-auth/`, datos);
    }
}