import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {FireAuthService, VariableService} from '../../services';
import { Router } from '@angular/router';
@Component({ 
  selector: 'app-login',
  template: `
  <button (click)="login()">Login</button>
  `,
})

export class LoginComponent implements OnInit{

	loggedUser:any;

  constructor(public fireAuthService: FireAuthService, private router:Router, private variableSev : VariableService) {}

  ngOnInit(){
  	this.variableSev.changeLog(false);
  }

 login() {
    this.fireAuthService.login().then(result=>{
    	this.router.navigate(['/']);
    	this.variableSev.changeLog(true);
    }).catch(error=>{
    	console.log(error);
    });
    
  }

  logout() {
     this.fireAuthService.logout();
  }

  checkForUser(){
  	this.loggedUser = this.fireAuthService.getCurrentUser();
  }
}