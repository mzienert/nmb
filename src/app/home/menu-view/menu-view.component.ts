import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {

  baseUrl = environment.baseUrl;
  loadingDrinks: boolean;
  drinkList: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadingDrinks = true;
    this.http.get(`${this.baseUrl}/get-menu`).subscribe(res => {
      this.drinkList = res;
      this.loadingDrinks = false;
    });
  }

}
