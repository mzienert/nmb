import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

export interface Times {
  value: string;
  text: string;
}
export interface Types {
  value: number;
  text: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  baseUrl = environment.baseUrl;
  eventForm: FormGroup;
  times: Times[] = [
    {value: '07:00', text: '7:00 am'},
    {value: '07:30', text: '7:30 am'},
    {value: '08:00', text: '8:00 am'},
    {value: '08:30', text: '8:30 am'},
    {value: '09:00', text: '9:00 am'},
    {value: '09:30', text: '9:30 am'},
    {value: '10:00', text: '10:00 am'},
    {value: '10:30', text: '10:30 am'},
    {value: '11:00', text: '11:00 am'},
    {value: '11:30', text: '11:30 am'},
    {value: '12:00', text: '12:00 pm'},
    {value: '13:00', text: '1:00 pm'},
    {value: '13:30', text: '1:30 pm'},
    {value: '14:00', text: '2:00 pm'},
    {value: '14:30', text: '2:30 pm'},
    {value: '15:00', text: '3:00 pm'},
    {value: '15:30', text: '3:30 pm'},
    {value: '16:00', text: '4:00 pm'},
    {value: '16:30', text: '4:30 pm'},
    {value: '17:00', text: '5:00 pm'},
    {value: '17:30', text: '5:30 pm'},
    {value: '18:00', text: '6:00 pm'},
    {value: '18:30', text: '6:30 pm'},
    {value: '19:00', text: '7:00 pm'},
    {value: '19:30', text: '7:30 pm'},
    {value: '20:00', text: '8:00 pm'},
    {value: '20:30', text: '8:30 pm'},
    {value: '21:00', text: '9:00 pm'},
    {value: '21:30', text: '9:30 pm'},
    {value: '22:00', text: '10:00 pm'},
    {value: '22:30', text: '10:30 pm'},
    {value: '23:00', text: '11:00 pm'},
    {value: '23:30', text: '11:30 pm'}
  ];
  create: boolean;
  loadingEvents: boolean;
  eventList: any;
  event: any;
  loading: Boolean;
  id: number;
  type: number;
  types: Types[] = [
    {value: 0, text: 'Single'},
    {value: 1, text: 'Recurring'}
  ];
  allDay: number;

  constructor(private fb: FormBuilder, public eventService: EventService, private http: HttpClient, public snackbar: MatSnackBar) {
    this.eventForm = fb.group({
      'name': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      'date': [null],
      'startTime': [null],
      'description': [null],
      'type': [0],
      'endTime': [null]
    });
  }

  ngOnInit() {
    this.create = false;
    this.loadingEvents = true;
    this.eventService.getEvents().subscribe(res => {
      this.loadingEvents = false;
      this.eventList = res;
    });
    this.loading = false;
    this.type = 0;
    this.allDay = 0;
    
  }

  checkValue(event: any){
    if(event.checked) {
      this.allDay = 1;
    } else {
      this.allDay = 0;
    }
 }

  createEvent(): void {
    this.eventForm.reset();
    this.id = null;
    this.create = true;
  }

  minutes_with_leading_zeros(dt) {
    return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
  }

  getEvent(id): void {
    this.create = true;
    this.loading = true;
    this.id = id;
    this.http.get(`${this.baseUrl}/get-event/${id}`).subscribe(res => {
      this.loading = false;
      const dateTime = new Date(res[0].startTime);
      const end = new Date(res[0].endTime);
      this.eventForm.get('date').setValue(dateTime);
      const hours = dateTime.getHours();
      const mins = this.minutes_with_leading_zeros(dateTime);
      const startTime = `${hours}:${mins}`;
      this.eventForm.get('startTime').setValue(startTime);
      let endHours = end.getUTCHours();
      let endMins = this.minutes_with_leading_zeros(end);
      const endTime = `${endHours}:${endMins}`;
      this.eventForm.get('endTime').setValue(endTime);
      console.log(endTime)
      this.eventForm.patchValue({
        name: res[0].title,
        description: res[0].description,
        date: dateTime,
        startTime: startTime,
        endTime: endTime
      });
    });
  }

  saveEvent(): void {

    if (this.eventForm.valid) {
      const data = this.eventForm.value;
      if (this.id == null) {
        this.loading = true;

        let date;
        if (this.eventForm.value.type === 0) {
          date = this.eventForm.value.date;
        } else {
          date = new Date("January 01, 2050 00:00:00");
        }

        if (this.allDay == 0) {
          const startTime = this.eventForm.value.startTime;
          const startFields = startTime.split(':');
          const startHours = startFields[0];
          const startMins = startFields[1];
          date.setHours(startHours, startMins);
        } else {
          date.setHours(0o0, 0o0, 0o0);
        }


        if (this.eventForm.value.endTime != '' && this.allDay != 1) {
          const endTime = this.eventForm.value.endTime;
          const endFields = endTime.split(':');
          const endHours = endFields[0];
          const endMins = endFields[1];
          let d = new Date(2050, 1, 1, endHours, endMins);
          data.endTime = d;
        } else {
          data.endtime = null;
        }

        data.date = date;
        data.type = this.eventForm.value.type;
        data.allDay = this.allDay;

        this.http.post(`${this.baseUrl}/create-event`, data).subscribe(res => {
          this.create = false;
          this.loading = false;
          this.snackbar.open('Your event has been created.', '', {
            duration: 4000
          });
        });

      } else {
        this.http.post(`${this.baseUrl}/update-event/${this.id}`, data).subscribe(res => {
          this.create = false;
          this.loading = false;
          this.snackbar.open('Your event has been updated.', '', {
            duration: 4000
          });
        });
      }
    }
  }

}
