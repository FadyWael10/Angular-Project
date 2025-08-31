import { Injectable } from '@angular/core';
import { environment } from '../env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`);
  }

  getById<T>(endpoint: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  create<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  update<T>(endpoint: string, id: number | string, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data);
  }

  delete<T>(endpoint: string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }
  search<T>(endpoint: string, params: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, { params });
  }
}
