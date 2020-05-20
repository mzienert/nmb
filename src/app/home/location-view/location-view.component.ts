import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.css']
})
export class LocationViewComponent implements OnInit {
  
  baseUrl = environment.baseUrl;
  loadingHours: boolean;
  mon: any;
  tue: any;
  wed: any;
  thu: any;
  fri: any;
  sat: any;
  sun: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadingHours = true;
    this.http.get(`${this.baseUrl}/get-hours`).subscribe(res => { 
      //this.loadingHours = false;
      if(res[0].open === res[0].close) {
        this.mon = 'Closed';
      } else {
        this.mon = this.tConvert(res[0].open) + ' - ' + this.tConvert(res[0].close);
      }
      if(res[1].open === res[1].close) {
        this.tue = 'Closed';
      } else {
        this.tue = this.tConvert(res[1].open) + ' - ' + this.tConvert(res[1].close);
      }
      if(res[2].open === res[2].close) {
        this.wed = 'Closed';
      } else {
        this.wed = this.tConvert(res[2].open) + ' - ' + this.tConvert(res[2].close);
      }
      if(res[3].open === res[3].close) {
        this.thu = 'Closed';
      } else {
        this.thu = this.tConvert(res[3].open) + ' - ' + this.tConvert(res[3].close);
      }
      if(res[4].open === res[4].close) {
        this.fri = 'Closed';
      } else {
        this.fri = this.tConvert(res[4].open) + ' - ' + this.tConvert(res[4].close);
      }
      if(res[5].open === res[5].close) {
        this.sat = 'Closed';
      } else {
        this.sat = this.tConvert(res[5].open) + ' - ' + this.tConvert(res[5].close);
      }
      if(res[6].open === res[6].close) {
        this.sun = 'Closed';
      } else {
        this.sun = this.tConvert(res[6].open) + ' - ' + this.tConvert(res[6].close);
      }
    });
  }

  tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

}
