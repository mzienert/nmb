import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AboutService} from '../../services/about.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  baseUrl = environment.baseUrl;
  bgImg: string;

  constructor(private http: HttpClient, private aboutService: AboutService) { }

  ngOnInit() {
    this.aboutService.getBg().subscribe((data: any) => {
      this.bgImg = data.Item.content;
    });
  }

}
