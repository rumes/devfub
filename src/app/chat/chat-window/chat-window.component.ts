import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, Params,ActivatedRoute } from '@angular/router';
import {FirebaseService} from '../../services';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

	param:any;
	members : any;

  constructor(private router : Router,  private route: ActivatedRoute, private firebaseService:FirebaseService) {

  }

  ngOnInit() {
  	// this.route.params
  	// .switchMap(( params : any )=>(this.param = params.id), this.firebaseService.getMembers(this.param))
  	// .subscribe(members =>{this.members = members;});
  }

}
