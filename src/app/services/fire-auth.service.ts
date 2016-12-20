import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class FireAuthService{
	private user : any ;
	public loged : boolean = false;

  constructor(private af: AngularFire) { }

  login() {
    return this.af.auth.login();
  }

  logout() {
    // console.log(this.af.auth.logout());
     this.af.auth.logout();
     this.loged =false;
  }

// get current user
  getCurrentUser(){
  return this.af.auth
  		.map(user=>{
  			this.user = user;
        // console.log(this.user);
        return this.user;
  		}).take(1);
  }

// checking user is already logged in or not
  isLogged(){
    return this.af.auth.map((auth) => {
          if (!auth) {            
            return false;
          }
          return true;
      }).take(1);
  }




}
