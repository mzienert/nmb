import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Times {
  value: string,
  text: string
}

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  hoursForm: FormGroup;
  baseUrl = environment.baseUrl;
  loading: Boolean;
  times: Times[] = [
    {value: 'closed', text: 'closed'},
    {value: '00:00', text: '12:00 am'},
    {value: '00:30', text: '12:30 am'},
    {value: '01:00', text: '1:00 am'},
    {value: '01:30', text: '1:30 am'},
    {value: '02:00', text: '2:00 am'},
    {value: '02:30', text: '2:30 am'},
    {value: '03:00', text: '3:00 am'},
    {value: '03:30', text: '3:30 am'},
    {value: '04:00', text: '4:00 am'},
    {value: '04:30', text: '4:30 am'},
    {value: '05:00', text: '5:00 am'},
    {value: '05:30', text: '5:30 am'},
    {value: '06:00', text: '6:00 am'},
    {value: '06:30', text: '6:30 am'},
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
  ]

  constructor(private fb: FormBuilder, private http: HttpClient, public snackbar: MatSnackBar) {
    this.hoursForm = fb.group({
      'monOpen': ['', Validators.required],
      'monClose': ['', Validators.required],
      'tueOpen': ['', Validators.required],
      'tueClose': ['', Validators.required],
      'wedOpen': ['', Validators.required],
      'wedClose': ['', Validators.required],
      'thuOpen': ['', Validators.required],
      'thuClose': ['', Validators.required],
      'friOpen': ['', Validators.required],
      'friClose': ['', Validators.required],
      'satOpen': ['', Validators.required],
      'satClose': ['', Validators.required],
      'sunOpen': ['', Validators.required],
      'sunClose': ['', Validators.required]
    });
  }


  ngOnInit() {
    this.http.get(`${this.baseUrl}/get-hours`).subscribe(res => {
      this.hoursForm.patchValue({
        monOpen: res[0].open,
        monClose: res[0].close,
        tueOpen: res[1].open,
        tueClose: res[1].close,
        wedOpen: res[2].open,
        wedClose: res[2].close,
        thuOpen: res[3].open,
        thuClose: res[3].close,
        friOpen: res[4].open,
        friClose: res[4].close,
        satOpen: res[5].open,
        satClose: res[5].close,
        sunOpen: res[6].open,
        sunClose: res[6].close
      });
    });
  }

  saveHours() {
    const data = this.hoursForm.value;
    if(this.hoursForm.valid) {
      this.loading = true;
      this.http.post(`${this.baseUrl}/set-hours`, data).subscribe(res => {
        this.loading = false;
        this.snackbar.open('Your hours have been updated.', '', {
          duration: 4000
        });
      })
    }
  }

}
