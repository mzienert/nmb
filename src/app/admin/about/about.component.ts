import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  baseUrl = environment.baseUrl;
  aboutForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, public snackbar: MatSnackBar) {
    this.aboutForm = fb.group({
      'one': [null],
      'two': [null]
    });
  }

  ngOnInit() {
    this.http.get(`${this.baseUrl}/about-one`).subscribe(res => {
      this.aboutForm.patchValue({one: res[0].content});
    });
    this.http.get(`${this.baseUrl}/about-two`).subscribe(res => {
      this.aboutForm.patchValue({two: res[0].content});
    });
  }

  saveAbout() {
    const data = this.aboutForm.value;
    this.http.post(`${this.baseUrl}/update-about`, data).subscribe(res => {
      this.snackbar.open('About has been updated.', '', {
        duration: 4000
      });
    });
  }

}
