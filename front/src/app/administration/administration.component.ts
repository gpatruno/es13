import { Component, OnInit } from '@angular/core';
import { APIService } from '../API & Auth/api.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  selectedFile: File = null;

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File> event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('uploadImage', this.selectedFile, this.selectedFile.name);

    this.apiService.uploadImg(fd).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress : ' + Math.round(event.loaded / event.total * 100) + '%');
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });
  }
}
