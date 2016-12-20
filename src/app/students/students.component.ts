// import required Dependencies to the Component
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BackendService} from '../services';
import {Grad, Classes, Student} from '../_model';
import { FormBuilder,Validators,FormControl,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
// set required variables to assing data
  grads: SelectItem[]=[];
  classes: SelectItem[]=[];
  apiGrads : Grad[] = [];
  apiClasses : Classes[] = [];
  studentform: FormGroup;
  model:any= new Student;
  submitted: boolean;
  errorText:any;
  msgs:any =[];
  result:any; 
  selectGrad:any;
  selectClasses:any;
  classId:any;
// using Constructor Inject Dependencies in to the component
  constructor(private backendService: BackendService,private fb: FormBuilder, private router:Router) 
  { 
  }
// On init send get call to grads controller in backend to get all greads in the DB usin backend services
// this grads are required to intiat drads drop down menu
  ngOnInit() {
  	this.getGrads();
  	this.studentform = this.fb.group({
      // on oint start validate the form
            'name': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'grad_id': new FormControl('', Validators.required),
            'class_id': new FormControl('', Validators.required),
        });
  }

// function that use to send backend calls for get all grads
  getGrads(){
  	this.backendService.getList('api/grads')
  	.then(grads=>{
  		this.apiGrads = grads;
  		this.grads.push({label:'Select Grad', value:null});
  		for (var i = this.apiGrads.length - 1; i >= 0; i--) {
        // returned grads push in to the {grads SelectItems} array
  			this.grads.push({label:''+[this.apiGrads[i]['name']],value:[this.apiGrads[i]['id']]})
  		}
  	});
  }
// after selecting a grad using selected grad's id call for related classes in the backend
  getClasses(){
  	console.log(this.selectGrad[0]);
  	this.backendService.getById('api/grads',this.selectGrad[0])
  	.then(classes=>{
  		this.apiClasses = classes;
  		this.classes =[];
  		this.classes.push({label:'Select Grad', value:null});
  		for (var i = this.apiClasses.length - 1; i >= 0; i--) {
  			this.classes.push({label:''+[this.apiClasses[i]['name']],value:[this.apiClasses[i]['id']]})
  		}
  	});
  }

// On submit Using backendService create call create a new Student 
  onSubmit(){
  	this.submitted = true;
  	this.msgs = [];
  	this.classId = this.selectClasses[0];
  	this.model.grad_id = this.selectGrad[0];
  	this.model.class_id = this.selectClasses[0];
  	this.backendService.create('api/students',this.model)
  	.then(result=>{
      // creation is success set the success msg and navigate to Student list that all have same grade id
	    this.result = result;
	    this.msgs.push({severity:'success', summary:'Success', detail:'Student Added Succesfuly'});
	    this.router.navigate(['/classes',this.classId]);
	},(error)=>{
	     // handl errors
       // if errors respond came set the error message 
	    this.errorText = error._body;
	    this.msgs.push({severity:'error', summary:'error', detail:JSON.parse(this.errorText).error.email[0]});
	});
  }

}
