import { Component, OnInit ,ViewChild} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import  {Classes} from '../_model/classes';
import {ConfirmationService} from 'primeng/primeng';

import { Router, Params,ActivatedRoute } from '@angular/router';
import {BackendService} from '../services';
import {Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styleUrls: ['./grad.component.css']
})
export class GradComponent implements OnInit {

	private subscription: Subscription;
	private classes: any[]=[];
  myClass: any = new Classes;
	selectedClass:any;
  displayDialog:boolean;
  param:any;
  result:any;
  errorText:any;
  msgs:any[]=[];
  // view child access Html element directly
    @ViewChild('dt') dt;

  constructor(private router : Router,  private route: ActivatedRoute, private classesService: BackendService, private confirmationService : ConfirmationService) { 
  	// const id: Observable<string> = route.params.map(p => p.id);
  }

  ngOnInit() {
    // get classes using url parameter
  	this.route.params
  	.switchMap(( params : any)=>(this.param = params.id,this.classesService.getById('api/grads',params.id)))
  	.subscribe(classes=> {
  		this.classes = classes;
  	});
  	
  }


  getClasses(){
    // call for classes by grad id * after init this can be use on init this can't be use
    this.classesService
    .getById('api/grads',this.param )
    .then(classes =>{this.classes = classes;});
  }

  showDialogToAdd() {
    // popup dialog window activate window
        this.displayDialog = true;
    }

  save() {
   
       // set grad_id in new Class
       this.myClass.grad_id = this.param;
       // post call for create Class
       this.classesService.create('api/classes',this.myClass).then(result=>{
           this.selectedClass = result;
           this.msgs = [];
           // call for new data and reset table
           this.getClasses();
           this.dt.reset();
           this.msgs.push({severity:'success', summary:'Success', detail:'Class Added Succesfuly'})
           },(error=>{
             // handl errors
             this.errorText = error._body;
             this.msgs.push({severity:'error', summary:'error', detail:JSON.parse(this.errorText).error.name[0]});
           }));       

     // close the window
      this.displayDialog = false;

  }
    // close the window
    cancle(){
    this.displayDialog = false;
    
  }

  deleteClass(data){
    this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
                  accept: () => {
                    this.classesService.delete('api/classes',data.id).then(retur => 
                      {
                        this.result= retur;
                        this.getClasses()

                    }).then(this.dt.reset());
    }
  });
  }

  showStudent(event){
  	this.selectedClass = event.data.id;
    this.router.navigate(['/classes', this.selectedClass]);
  }
}

