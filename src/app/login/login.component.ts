// import required defendencies
import { Component, OnInit } from '@angular/core';
import {AuthenticationService, VariableService} from '../services'
import { FormBuilder,Validators,FormControl,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    userform: FormGroup;
    
    submitted: boolean;
    errorText:any;
    msgs:any[]=[];
     model: any = {};
    description: string;
   
// inject services to component trough constructor
    constructor(private fb: FormBuilder, private authService:AuthenticationService, private router: Router ,private variableSev : VariableService) {}
    // validating data
    ngOnInit() {
        this.authService.logout();
        this.variableSev.changeLog(false);
        this.userform = this.fb.group({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required),
        });
        
    }
    
    // on submit action defined
    onSubmit(value: string) {
        this.submitted = true;
            // get user email and password and call for the authentication service and pass that values
        	this.authService.login(this.model.email,this.model.password)
        	.subscribe(result => {
                if (result === true) {
                     // login successful
                    // if the login is success  navigate to home anad change header component logged variable to true 
                    this.variableSev.changeLog(true);
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    
                }
            },( error ) => {
                          this.errorText = error._body;
                          this.msgs.push({severity:'error', summary:'Info Message', detail:JSON.parse(this.errorText).error});
                        });
        
    }
    

}
