import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFire } from 'angularfire2';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private af: AngularFire) { }
    canActivate() {
        //befor navigate check for permission if not rederect to authentication page 
        return this.af.auth.map((auth) => {
            if (!auth) {
              this.router.navigate(['/auth']);
              return false;
            }
            return true;
        }).take(1);
        
    }
}