import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {


    constructor(private http: HttpClient) {}

    registrarUsuario(data: any): Observable<any> {
        return this.http.post<any>(`${global.url}/api/1.0/registrar_usuario/`, data);
    }
}
