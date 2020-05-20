import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Msgs {
  id: number;
  message: string;
  display: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getMessage() {
    return this.http.get<Msgs[]>(`${this.baseUrl}/get-message`);
  }

}
