// service for change veriable out from the component scope
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

@Injectable()
export class VariableService {
  // set the variable source
	private newDrawerSource = new Subject<boolean>();
	private newLoggedSource = new Subject<boolean>();

	newDrawer = this.newDrawerSource.asObservable();
	newLogged = this.newLoggedSource.asObservable();

  constructor() { }
  // function to change isToggle variable in drawer.component
  	toggleDrawer(drawer: boolean) {
        this.newDrawerSource.next(drawer);
    }

  // function to change  logged variable in header.component
    changeLog(logged:boolean){
    	this.newLoggedSource.next(logged);
    }
}
