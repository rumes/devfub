// import requierd Dependencies
import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {BackendService} from '../services';
import {Grad, Classes} from '../_model';
import { FormBuilder,Validators,FormControl,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css']
})
export class AddClassesComponent implements OnInit {
// declaring variable
  grads: SelectItem[]=[]; //for dropdown menu
  apiGrads : Grad[] = [];
  classform: FormGroup;
  model:any= new Classes;
  submitted: boolean;
  errorText:any;
  msgs:any =[];
  result:any; 
  selectGrad:any;

// inject services through constructure
  constructor(private backendService: BackendService,private fb: FormBuilder, private router:Router) { }

// on init call for grads list to set grads drop down in the form
  ngOnInit() {
  	this.getGrads();
    // start form validation
  	this.classform = this.fb.group({
            'name': new FormControl('', Validators.required),
            'grad_id': new FormControl('', Validators.required),
        });
  }
// get all grads using backend service
  getGrads(){
  	this.backendService.getList('api/grads')
  	.then(grads=>{
  		this.apiGrads = grads;
      // push value in to drop down menu
  		this.grads.push({label:'Select Grad', value:null});
  		for (var i = this.apiGrads.length - 1; i >= 0; i--) {
  			this.grads.push({label:''+[this.apiGrads[i]['name']],value:[this.apiGrads[i]['id']]})
  		}
  	});
  }

// on form submit action
  onSubmit(){
  	this.submitted = true;
  	this.msgs = [];
    // get selected dropdown menu value
  	this.model.grad_id = this.selectGrad[0];
    // using backend service send post request to backend
  	this.backendService.create('api/classes',this.model).then(result=>{
	    this.result = result;
      // if no error set the succes message
	    this.msgs.push({severity:'success', summary:'Success', detail:'Class Added Succesfuly'});
      // if class add is success navigade to class list of it's parent grade
	    this.router.navigate(['/grads',this.model.grad_id]);
	    },(error)=>{
	     // handl errors
       // if fail handle error and set Error msg to the user
	     this.errorText = error._body;
	     this.msgs.push({severity:'error', summary:'error', detail:JSON.parse(this.errorText).error.name[0]});
	   });
  }

}
