import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  baseUrl = environment.baseUrl;
  imgOne: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${this.baseUrl}/image-bg`).subscribe(res => {
      this.imgOne = `https://nmb-compress.s3-us-west-2.amazonaws.com/public/${res[0].name}`;
    })
  }

}
