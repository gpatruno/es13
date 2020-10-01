import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../API & Auth/api.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})

export class ArticleFormComponent implements OnInit {

  valueColor = "#ffffff";
  public upload = new Date();
  public timeUpload = new Date().getHours() + ':' + new Date().getMinutes();
  /** variable preview image */
  public imagePath;
  imgURL: any;
  public image;
  public message: string;
  
  constructor(private router: Router, private apiService: APIService) { 

  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    this.image = files[0];
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
}
