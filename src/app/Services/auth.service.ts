import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/login', { username, password })
  }

  register(username:string, password: string): Observable<any> {
    return this.http.post('/api/register', { username, password })
  }
}
