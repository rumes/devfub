import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router'
import {FirebaseRef,FirebaseListObservable} from "angularfire2";
import {FirebaseService, FireAuthService} from '../services';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentUser:any;
  memberedGroups:any[]=[];

  constructor( @Inject(FirebaseRef) fb, private firebaseService: FirebaseService, private router:Router, private firebaseAuth:FireAuthService) {
    }

  ngOnInit() {
    this.memberGroups();
  }

  memberGroups(){
    this.firebaseAuth.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
      this.firebaseService.getMembersGroups(user.uid)
      .subscribe(groups =>{
        this.memberedGroups =groups;
      });
    });
  }

}
