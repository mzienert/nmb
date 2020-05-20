import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mesage',
  templateUrl: './mesage.component.html',
  styleUrls: ['./mesage.component.css']
})
export class MesageComponent implements OnInit {

  baseUrl = environment.baseUrl;
  messageForm: FormGroup;
  loading: Boolean;

  constructor(private fb: FormBuilder, private http: HttpClient, public snackbar: MatSnackBar) {
    this.messageForm = fb.group({
      'text': [null]
    });
  }

  ngOnInit() {
    this.http.get(`${this.baseUrl}/get-message`).subscribe(res => {
      this.messageForm.patchValue({
        text: res[0].message
      });
    });
  }

  saveMsg(): void {
    const data = this.messageForm.value;
    this.loading = true;
    this.http.post(`${this.baseUrl}/update-message`, data).subscribe(res => {
      this.loading = false;
      this.snackbar.open('Your message has been saved.', '', {
        duration: 4000
      });
    });
  }

}
