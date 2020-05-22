import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  
  baseUrl = environment.baseUrl;
  imgForm: FormGroup;
  loading: Boolean;
  selectedFile: File;
  type: any;
  id: any;
  images: any;
  color = 'primary';
  mode = 'determinate';
  value: any;

  constructor(private fb: FormBuilder, private http: HttpClient, public snackbar: MatSnackBar, private cd: ChangeDetectorRef) {
    
    this.imgForm = fb.group({
      'file': [null]
    });
  }

  ngOnInit() {
    this.getImageList();
  }

  getImageList() {
    this.http.get(`${this.baseUrl}/list-images`).subscribe(res => {
      this.images = res;
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.type = this.selectedFile.name.split('.', 2);
    this.type = '.' + this.type[1];
    this.id = uuid() + this.type;
    this.value = 0;
  }

  onUpload() {
    this.loading = true;
    Storage.put(this.id, this.selectedFile, {
      level: 'public',
      contentType: this.type
    })
    .then (result => {
      this.selectedFile = null;
      this.http.post(`${this.baseUrl}/insert-image`, {'name': this.id, type: 0}).subscribe(res => {
        this.loading = false;
        this.snackbar.open('Your image has been saved.', '', {
          duration: 4000
        });
        this.getImageList();
      });
    })
    .catch(err => {
      this.loading = false;
      this.snackbar.open(err, '', {
        duration: 4000
      });
    });
  
  }

    clear() {
      this.selectedFile = null;
    }

    delete(img) {
      this.http.post(`${this.baseUrl}/delete-image`, {'name': img}).subscribe(res => {
        this.snackbar.open('Your image has been deleted.', '', {
          duration: 4000
        });
        var elem = document.getElementById(img);
        elem.parentNode.removeChild(elem);
        this.getImageList();
      });
    }

    img1(img) {
      this.http.post(`${this.baseUrl}/update-image-one`, {'name': img}).subscribe(res => {
        console.log('done')
      });
    }

    img2(img) {
      this.http.post(`${this.baseUrl}/update-image-two`, {'name': img}).subscribe(res => {
        console.log('done')
      });
    }

    bg(img) {
      this.http.post(`${this.baseUrl}/update-image-bg`, {'name': img}).subscribe(res => {
        console.log('done')
      });
    }

  }

  

