// import dependencies
import { Component, OnInit, OnChanges, Input, 
  		trigger, state, animate, transition, 
  		style,Inject,HostListener} from '@angular/core';

import { Router } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {VariableService,FireAuthService} from '../../services';
import { DOCUMENT } from "@angular/platform-browser";
@Component({
  selector: 'app-header',
  // set animationa for scroll header (visibilityChanged) and menu icon(drawerToggle)
  animations: [
  	trigger('visibilityChanged', [
      state('true' , style({ opacity: 1,  'padding-bottom':'120px'})),
      state('false', style({ opacity: 0.8, position:'fixed', top:'0px',
    		left:'0px', right:'0px',  bottom:'0px', 'padding-bottom':'0px' })),
      transition('1 => 0', animate('0ms')),
      transition('0 => 1', animate('0ms'))
  ]),
     trigger('drawerToggle', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)', position:'absolute', "z-index" : 10,
        left:'160px' })),
      state('false', style({ opacity: 1 })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('300ms'))
  ])
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
@Input() isScroll : boolean = false;
@Input() isToggle : boolean = false;
logged:boolean = false;
subscription: Subscription;
// inject services to component
  constructor(private variableService : VariableService ,
    private authService : FireAuthService, 
    private router : Router,
    @Inject(DOCUMENT) private document: Document) { 
    // logged in or logout defend on login component using variable service determined user logged in or logged out
    this.subscription = variableService.newLogged.subscribe(
            logged => {
                this.logged = logged;
            });
  }

// declair on init function
  ngOnInit() {
    // check for user is logged already
    this.checkLog();
  }
// declair toggel function for click on menu icon
  toggle(e){
    e.stopPropagation();
    this.isToggle = !this.isToggle;

    this.variableService.toggleDrawer(this.isToggle);
 
  }

// function for check user is already logged in
  checkLog(){
    // check in local storage for user
    if(this.authService.isLogged()){
      this.logged = true;
    }
  }

//on logout link clicked call to the auth service logout function 
  logOut(){
    this.authService.logout();
    this.logged = false;
    this.router.navigate(['/auth']);
  }

  @HostListener('window:click', ['$event'])
  onDocumentClick(e){
      if(this.isToggle) {
        this.isToggle = !this.isToggle;
        this.variableService.toggleDrawer(this.isToggle);
      }
      
  }
}
