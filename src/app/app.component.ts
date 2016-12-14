import { Component, OnInit } from '@angular/core';
import {BackendService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  result : any[] = [];

  constructor(private backend : BackendService){

  }
  ngOnInit(){
  }
  
}
