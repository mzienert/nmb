import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  loadingEvents: boolean;
  eventList: any;
  date: any;

  constructor(public eventService: EventService) { }

  ngOnInit() {
    this.date = moment(new Date()).format('YYYY');
    this.loadingEvents = true;
    this.eventService.getEvents().subscribe(res => {
      this.loadingEvents = false;
      this.eventList = res;
      console.log(this.eventList.length)
    });
  }

}
