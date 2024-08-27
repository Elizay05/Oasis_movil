import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'https://elizay05.pythonanywhere.com/api/1.0';
  authToken = '0feb642ec2305e8620a94d26722dc45abda11b3c'; // Reemplaza con tu token válido

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.authToken}`
    });
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evento/`, { headers: this.getHeaders() });
  }

  getRegisterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evento/${id}/`, { headers: this.getHeaders() });
  }

  addRegister(post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/evento/`, post, { headers: this.getHeaders() });
  }

  updateRegister(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/evento/${id}/`, post, { headers: this.getHeaders() });
  }

  deleteRegister(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/evento/${id}/`, { headers: this.getHeaders() });
  }
}
