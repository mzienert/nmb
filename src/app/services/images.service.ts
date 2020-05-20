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

  listImages(): Observable<Images[]> {
    return this.http.get<Images[]>(`${this.baseUrl}/list-images`)
  }

  listMedia(): Observable<Images[]> {
    return this.http.get<Images[]>(`${this.baseUrl}/list-media`)
  }
  
}
