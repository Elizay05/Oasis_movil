import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class QrMesaService {
  
    apiUrl = 'https://elizay05.pythonanywhere.com/api/1.0/';

    activarMesa(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}token_qr/`, data);
    }
  
    constructor(private http: HttpClient) { }

  }