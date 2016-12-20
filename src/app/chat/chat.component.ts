import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router'
import {FirebaseRef,FirebaseListObservable} from "angularfire2";
import {FirebaseService, FireAuthService} from '../services';
import { Observable } from 'rxjs/Observable';
import { Group } from '../_model'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentUser:any;
  memberedGroups:any[]=[];
  allGroups:Group[] =[];
  filterGroups:Group[] = [];

  constructor( @Inject(FirebaseRef) fb, private firebaseService: FirebaseService, private router:Router, private firebaseAuth:FireAuthService) {
    }

  ngOnInit() {
    this.memberGroups();
    this.getAllGroups();
  }

  memberGroups(){
    // get current user
    this.firebaseAuth.getCurrentUser()
    .subscribe(user => {
      this.currentUser = user;
      // get current user membered group using user id
      this.firebaseService.getMembersGroups(user.uid)
      .subscribe(groups =>{
        this.memberedGroups =groups;
      });
    });
  }

  getAllGroups(){
    // get all groups from firebase anad set them to allGroup variable
      this.firebaseService.getGroups()
      .subscribe(groups => {
        this.allGroups = groups;
      });
    // get last ten group and assing to filterGroup variable
      this.firebaseService.getTopTen().subscribe(groups => this.filterGroups =groups);
  }

  searchGroup(search : string){
    this.filterGroups = this.allGroups.filter(group => group.title.includes(search)).slice(0,10);
    // console.log(this.filterGroups);
  }

}
