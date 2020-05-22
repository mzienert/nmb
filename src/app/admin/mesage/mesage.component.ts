import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-mesage',
  templateUrl: './mesage.component.html',
  styleUrls: ['./mesage.component.css']
})
export class MesageComponent implements OnInit {

  baseUrl = environment.baseUrl;
  messageForm: FormGroup;
  loading: Boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public snackbar: MatSnackBar,
    private aboutService: AboutService,
  ) {

    this.messageForm = fb.group({
      'text': [null]
    });

  }

  ngOnInit() {

    this.aboutService.getMessage().subscribe((data: any) => {
      this.messageForm.patchValue({
        text: data.Item.content
      });
    });

  }

  saveMsg(): void {
    const formData = this.messageForm.value;
    this.loading = true;

    this.aboutService.updateMessage(formData).subscribe((data: any) => {
      this.loading = false;
      this.snackbar.open('Your message has been saved.', '', {
        duration: 4000
      });
    });
  }

}
