import { Injectable , Inject } from '@angular/core';
import {FirebaseRef, AngularFire,FirebaseListObservable} from "angularfire2";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class FirebaseService {
	private fb :any;
	private user :any;
	private result :any;
	// private memberedGroup:any[] = [];
  constructor( @Inject(FirebaseRef) fb ,private af:AngularFire) {
  		
  		this.fb = fb;
    }

    getCurrentUser(){
	  return this.af.auth
	  		.map(user=>{
	  			this.user = user;
	        return this.user;
	  		}).take(1);
	  }

    setGroup(title,userId): Promise<any> {

    	// set group in firebase real time database
    	return this.fb.database().ref('groups').push({
	    		title : title,
	    		admin : userId,
		    	}).then(result =>{
		    		// result.json().data
		    		// if group creation is succeed set titlt and group_id in group has title
		    		this.fb.database().ref('groups-has-title').child(title).set(result.key);
		    		return result.key;
		    		// return this.result ;
		    	}).catch(error => this.handleError(error));

    }

// get all the groups in the firebase database
    getGroups(){
    	return this.af.database.list('/groups');
    }

// set member to a group under title
    setMember(title,userId){
    	this.fb.database()
	    	.ref('members/'+title)
	    	.child(userId)
	    	.set(true)
	    	.then(result =>{
	    	}, error =>{
	    		this.handleError(error);
	    	});

    }

// get the user membered group using user id
    getMembersGroups(uid:string){
	return this.af.database.list('/members',
	    	{
	    		query:{
	    			orderByChild: uid
	    		}
	    	});
		
    }

// get last ten groups from firebas 
    getTopTen(){
    	return this.af.database.list('/groups',
    	{
    		query:
    		{
    			limitToLast: 10
    		}
    	})
    }

    isMember(title:string, uid:string){
		return this.af.database.list('/members/'+title).map(member => {
				if(member) {
					console.log(member);
				console.log(member)
					return true;
				}
				return false;
						
				}).take(1)
    }

    private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	  }

}
