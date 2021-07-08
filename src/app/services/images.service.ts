import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Images } from '../home/image-view/images';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listImages(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/images/list-all`);
  }

  listMedia(): Observable<Images[]> {
    return this.http.get<Images[]>(`${this.baseUrl}/list-media`)
  }

}
