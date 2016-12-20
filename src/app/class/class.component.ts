import { Component, OnInit,ViewChild } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, Params,ActivatedRoute } from '@angular/router';
import {BackendService} from '../services';
import {Subscription, Observable } from 'rxjs';
import {Student} from '../_model/student';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

	private students: Student[]=[];
	selectedClass:Student;
	displayDialog: boolean;
    param:any;
    student: any = new Student;
    errorText:any;
    msgs:any[]=[];
    // view child access Html element directly
    @ViewChild('dat') dat;

  constructor(private router : Router,  private route: ActivatedRoute, private classesService: BackendService) { }

  ngOnInit() {
  	// get student using url parameter
  	this.route.params
  	.switchMap(( params : any )=>(this.param = params.id, this.classesService.getById('api/students',this.param ))).subscribe(students =>{this.students = students;
  		
  	});
   		
  }

  getdata(){
  	// call for studen by class name * after init this can be use on init this can't be use
  	this.classesService.getById('api/students',this.param ).then(students =>{this.students = students;
  		
  	});
  }

  showDialogToAdd() {
  	// poup dialog window activate window
        this.displayDialog = true;
    }

   save() {
   	// get the current class for grad_id and class_id
   		this.classesService.getById('api/classes',this.param).then(result => {
   			this.selectedClass = result;
   			// set grad_id and class id in new student
   			this.student.grad_id = this.selectedClass.grad_id;
   			this.student.class_id = this.selectedClass.id;
        this.msgs = [];
   			// post call for create student
   			this.classesService.create('api/students',this.student).then(result=>{
		   			this.selectedClass = result;
		   			// call for new data and reset table
		   			this.getdata();
		   			this.dat.reset();
            this.msgs.push({severity:'success', summary:'Success', detail:'Student Added Succesfuly'})
		   			},(error)=>{
               // hand errors
             this.errorText = error._body;
             this.msgs.push({severity:'error', summary:'error', detail:JSON.parse(this.errorText).error.email[0]});
             });

		   		});
   		

   		// close the window
        this.displayDialog = false;

    }

  cancle(){
    this.displayDialog = false;
    // close the window
  }


}
