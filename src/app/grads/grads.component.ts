import { Component, OnInit,ViewChild ,ViewEncapsulation} from '@angular/core';
import {BackendService} from '../services';
import {Classes,Grad} from '../_model';
import { Router} from '@angular/router';


@Component({
  selector: 'app-grads',
  templateUrl: './grads.component.html',
  styleUrls: ['./grads.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GradsComponent implements OnInit {

    grads: any[];
    errorText:any;
    classes: Classes[];
    myGrad : any = new Grad;
    displayDialog:boolean;
    selectedGrad: any;
    dialogVisible: boolean;
    msgs:any[] = [];
    @ViewChild('dtg') dtg;
    
    constructor(private classesService: BackendService, private router: Router) { }

    ngOnInit() {
        this.getGrads();
    }

    // get grads from backend
    getGrads(){
        this.classesService.getList('api/grads').then(grads =>{
            this.grads = grads;
        });
    }

    showDialogToAdd() {
    // popup dialog window activate window
        this.displayDialog = true;
    }

    save() {
       // post call for create Class
       this.msgs = [];
       this.classesService.create('api/grads',this.myGrad).then(result=>{
           this.selectedGrad = result;
           // call for new data and reset table
           
           this.getGrads();
           this.dtg.reset();
           this.msgs.push({severity:'success', summary:'Success', detail:'Grad Added Succesfuly'})
           },(error)=>{
             // handle errors
             this.errorText = error._body;
             this.msgs.push({severity:'error', summary:'error', detail:JSON.parse(this.errorText).error.name[0]});
           });       

     // close the window
      this.displayDialog = false;

  }

  // close the window
    cancle(){
    this.displayDialog = false;
    
  }
    // get selected grad id and navigate to class list that have same grad id as the new record
    showClass(event) {
   
        this.selectedGrad = event.data.id;
        this.router.navigate(['/grads', this.selectedGrad]);
    }
}
