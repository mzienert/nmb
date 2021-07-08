import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  baseUrl = environment.baseUrl;
  drinkList: any;
  create: boolean;
  drinkForm: FormGroup;
  loading: Boolean;
  id: number;
  loadingDrinks: boolean;

  constructor(private fb: FormBuilder, private http: HttpClient, public snackbar: MatSnackBar) {
    this.drinkForm = fb.group({
      'name': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      'description': [null]
    });
  }

  ngOnInit() {
    this.create = false;
    this.loadingDrinks = true;
    this.http.get(`${this.baseUrl}/get-menu`).subscribe(res => {
      this.drinkList = res;
      this.loadingDrinks = false;
    });
  }

  createEvent(): void {
    this.create = true;
    this.id = null;
    this.drinkForm.reset();
  }

  getDrink(id): void {
    this.create = true;
    this.loading = true;
    this.id = id;
    this.http.get(`${this.baseUrl}/get-drink/${id}`).subscribe(res => {
      this.loading = false;
      this.drinkForm.patchValue({
        name: res[0].name,
        price: res[0].price,
        description: res[0].description
      });
    });
  }

  saveDrink(): void {
    if (this.drinkForm.valid) {
      const data = this.drinkForm.value;
      if (this.id == null) {
        this.loading = true;
        this.http.post(`${this.baseUrl}/create-drink`, data).subscribe(res => {
          this.create = false;
          this.loading = false;
          this.snackbar.open('Your drink has been created.', '', {
            duration: 4000
          });
        });
      } else {
        this.http.post(`${this.baseUrl}/update-drink/${this.id}`, data).subscribe(res => {
          this.create = false;
          this.loading = false;
          this.snackbar.open('Your drink has been updated.', '', {
            duration: 4000
          });
        });
      }
    }

  }

}
