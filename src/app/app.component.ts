import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'The Nugget Mountain Bar';
  primaryImg: String;
  scrolled: Boolean;


  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    this.scrolled = true;
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.scrolled = false;
    this.primaryImg = 'https://picsum.photos/1585/770/?image=527';


  }

}
