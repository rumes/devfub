// import required dependencies
import { Component, OnInit } from '@angular/core';
import {BackendService} from '../services';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})

export class ClassesComponent implements OnInit {
	// declair Array to assing request data
	classes:any[] = [];

  constructor(private backendService: BackendService) { }
  // call for the backend using backend service and set recive data in to classes array
  ngOnInit() {
  	this.backendService.getList('api/classes').then(classes => this.classes = classes);
  }

}
