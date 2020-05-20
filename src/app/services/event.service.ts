import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Events {
  id: number;
  title: string;
  description: string;
  date: any;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public saveEvent(data: String) {
    this.http.post(`${this.baseUrl}/create-event`, data).subscribe(res => {
      console.log(res);
    });
  }

  public getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(`${this.baseUrl}/get-events`);
  }

}
