// import defendencies for the component
import { Component, OnInit, OnChanges, Input, 
      trigger, state, animate, transition, 
      style} from '@angular/core';
import { Router } from '@angular/router';

import {MenuItem} from 'primeng/primeng';
import {Subscription} from 'rxjs/Subscription';
import {VariableService} from '../../services/variable.service';

@Component({
  selector: 'app-drawer',
  animations: [
  // set animation for drawer to slide in and slide out
    trigger('drawerToggle', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)', width: '100px', position:'absolute', top:'0px',
        left:'0px' })),
      state('false', style({ opacity: 0.8,position:'fixed', left:'-180px', top:'0px' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('300ms'))
  ])
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})

export class DrawerComponent implements OnInit {
	 private items: MenuItem[];
   subscription: Subscription;
   @Input() isToggle : boolean = false;

  constructor(private variableService : VariableService ,private router:Router) { 
    // darawer is toggel when header menu button click show we use variable service to determine menu button click or not.
      this.subscription = variableService.newDrawer.subscribe(
            isToggle => {
                this.isToggle = isToggle;
            });
   }

  ngOnInit() {
    // set menu item to left side drawer 
  	this.items = [
                    {label: 'Home', icon: 'fa-home', routerLink : ['/']},
                    {label: 'Add Grade', icon: 'fa-plus',routerLink:['/grads']},
                    {label: 'Add Class', icon: 'fa-plus',routerLink:['/add-class']},
                    {label: 'Add Student', icon: 'fa-plus',routerLink:['/add-student']},
                    {label: 'Classes List', icon: 'fa-th-list',routerLink:['/all-classes']},
                    {label: 'Student List', icon: 'fa-th-list',routerLink:['/all-student']}
                ];
  }

}
