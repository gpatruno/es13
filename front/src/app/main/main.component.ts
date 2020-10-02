import { Component, OnInit } from '@angular/core';
import { APIService } from '../API & Auth/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getArticles().subscribe(res => {
      console.log(res);
    });
  }

}
