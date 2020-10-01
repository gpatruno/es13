import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../API & Auth/api.service';
import IMessage from '../models/IMessage';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  
  valueColor = "#ffffff";
  public upload = new Date();
  public timeUpload = new Date().getHours() + ':' + new Date().getMinutes();
  /** variable preview image */
  public imagePath;
  imgURL: any;
  public image;
  public message: string;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private router: Router, private apiService: APIService, private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formModel = this.prepareSave();
    console.log(formModel);
    this.apiService.uploadImage(this.image).subscribe((response: IMessage) => {
      // Si la requête a été réussi
      console.log(response);
    });
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

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: null
    });
  }

  private prepareSave(): any {
    let input = new FormData();
    // input.append('name', this.form.get('name').value);
    input.append('image', this.form.get('fileTest').value);
    return input;
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('fileTest').setValue(file);
    }
  }

  clearFile() {
    this.form.get('fileTest').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
