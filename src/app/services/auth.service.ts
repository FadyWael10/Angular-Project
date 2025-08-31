import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

login(email: string, password: string): Observable<{ token: string }> {
    if (email && password) {
        if(email == 'fady@gmail.com' && password == '1234')
           localStorage.setItem('role', 'admin');
        return new Observable(observer => {
            observer.next({ token: 'mocktoken' });
            observer.complete();
        });
    } else {
        return new Observable(observer => { 
            observer.error('Email and password are required');
        });
    }
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
