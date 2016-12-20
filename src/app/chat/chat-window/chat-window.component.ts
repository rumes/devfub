import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, Params,ActivatedRoute } from '@angular/router';
import {FirebaseService, FireAuthService} from '../../services';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

	param:any;
	members : any;
  isMember : boolean;

  constructor(private router : Router,  private route: ActivatedRoute, private fbs:FirebaseService, private fbas:FireAuthService) {

  }

  ngOnInit() {
    
  	this.route.params
  	.subscribe(members =>{
      this.param =members['id'];
      this.isRoomMember();
    });
  }

  joinRoom(){

  }

  isRoomMember(){
    this.fbs.isMember(this.param, 'ENS9r792YjcGtvuZsjPY1P4ysFQ2')
    .subscribe(retur => {
      this.isMember = retur;
    });
  }
}
