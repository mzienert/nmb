import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBg(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/content/bg-img`);
  }

  getBlockOne(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/content/block/1`);
  }

  getBlockTwo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/content/block/2`);
  }

  update(data): Observable<any> {
    return this.http.post(`${this.baseUrl}/content/update`, data);
  }

}
