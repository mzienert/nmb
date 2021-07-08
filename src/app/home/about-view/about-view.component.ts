import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent implements OnInit {

  baseUrl = environment.baseUrl;
  imgOne: string;
  imgTwo: string;
  cOne: string;
  cTwo: string;

  constructor(
    private http: HttpClient,
    private aboutService: AboutService,
  ) { }

  ngOnInit() {

    this.aboutService.getBlockOne().subscribe((data: any) => {
      this.cOne = data.Item.content;
      this.imgOne = data.Item.img;
    });

    this.aboutService.getBlockTwo().subscribe((data: any) => {
      this.cTwo = data.Item.content;
      this.imgTwo = data.Item.img;
    });

  }

}
