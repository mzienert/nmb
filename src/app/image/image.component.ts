import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  img: string;

  constructor(private dialogRef: MatDialogRef<ImageComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.img = data.img;
   }

  ngOnInit() {
    console.log(this.img);
  }

  close() {
    this.dialogRef.close();
  }

}
