import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { AboutService } from '../services/about.service';

export interface NavButtons {
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;
  message: boolean;
  messageTxt: string;
  baseUrl = environment.baseUrl;
  navButtons: NavButtons[] = [
    {title: 'Home'},
    {title: 'About'},
    {title: 'Menu'},
    {title: 'Events'},
    {title: 'Media'},
    {title: 'Gallery'},
    {title: 'Location'},
    {title: 'Shuttle'}
  ];

  constructor(
    public auth: AuthService,
    public router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private _scrollToService: ScrollToService,
    private aboutService: AboutService,
  ) { }

  ngOnInit() {

    this.aboutService.getMessage().subscribe((data: any) => {
      if (data.Item.content) {
        this.message = true;
        this.messageTxt = data.Item.content;
      } else {
        this.message = false;
      }
    });

  }

  signout(): void {
    this.auth.signOut();
  }

  ig() {
    window.open('https://www.instagram.com/thenuggetmountainbar/', '_blank');
  }

  fb() {
    window.open('https://www.facebook.com/TheNuggetMountainBar', '_blank');
  }

  scroll(title: string) {
    const config: ScrollToConfigOptions = {
      target: title,
      offset: -85
    };
    console.log(config)
    this._scrollToService.scrollTo(config);
  }

  call() {
    window.open('tel:+19707494412');
  }

}
