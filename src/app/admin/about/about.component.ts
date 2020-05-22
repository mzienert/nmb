import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  baseUrl = environment.baseUrl;
  aboutForm: FormGroup;
  disabled = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public snackbar: MatSnackBar,
    private aboutService: AboutService
  ) {
    this.aboutForm = fb.group({
      'one': [null],
      'two': [null],
    });
  }

  ngOnInit() {

    this.aboutService.getBlockOne().subscribe((data: any) => {
      this.aboutForm.patchValue({one: data.Item.content});
    });

    this.aboutService.getBlockTwo().subscribe((data: any) => {
      this.aboutForm.patchValue({two: data.Item.content});
    });

  }

  saveAbout() {
    const formData = this.aboutForm.value;
    this.disabled = true;

    this.aboutService.update(formData).subscribe((data: any) => {
      this.disabled = false;
      this.snackbar.open('About has been updated.', '', {
        duration: 4000
      });
    });
  }

}
