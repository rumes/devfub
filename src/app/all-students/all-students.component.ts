// import required dependencies
import { Component, OnInit } from '@angular/core';
import {BackendService} from '../services';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})

export class AllStudentsComponent implements OnInit {
	students:any[] = [];

  constructor(private backendService: BackendService) { }
// On init get all student using backend service and set them in to students array
  ngOnInit() {
  	this.backendService.getList('api/students').then(students => this.students = students);
  }

}
