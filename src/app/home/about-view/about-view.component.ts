import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent implements OnInit {

  baseUrl = environment.baseUrl;
  imgOne: string;
  imgTwo: string;
  c1: string;
  c2: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get(`${this.baseUrl}/about-one`).subscribe(res => {
      this.c1 = res[0].content;
    });
    this.http.get(`${this.baseUrl}/about-two`).subscribe(res => {
      this.c2 = res[0].content;
    });

    this.http.get(`${this.baseUrl}/image-one`).subscribe(res => {
      this.imgOne = `https://nmb-compress.s3-us-west-2.amazonaws.com/public/${res[0].name}`;
    })
    this.http.get(`${this.baseUrl}/image-two`).subscribe(res => {
      this.imgTwo = `https://nmb-compress.s3-us-west-2.amazonaws.com/public/${res[0].name}`;
    })
  }

}
