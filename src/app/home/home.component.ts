import { Component, OnInit } from '@angular/core';
import {BackendService} from '../services';
import {Grad,BigClass} from '../_model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	grads:any[]=[];
	classes : any[] = [];
  name:string;

  constructor(private backSevc : BackendService) { }

  ngOnInit() {
    // on init set the grad list and classes list
  	this.getGrads();
    

  }
// get grads from backend
  getGrads(){
  	this.backSevc.getList('api/grads').then(grads =>
  		{
  			this.grads = grads;
  		}).then(result => this.getContent());
  }

// get classes from backend
  getContent(){
    
  	return this.backSevc.getList('api/classes').then(classes =>
  		{
  			this.classes = classes;
  		}).then();
  	
  }
}
