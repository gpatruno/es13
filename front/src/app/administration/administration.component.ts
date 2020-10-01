import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from '../API & Auth/api.service';

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
    this.selectedFile = <File>event.taget.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, 'nondelimage');

    this.apiService.uploadImg(fd)
  }
}
