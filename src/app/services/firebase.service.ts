import { Injectable , Inject } from '@angular/core';
import {FirebaseRef, AngularFire,FirebaseListObservable} from "angularfire2";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirebaseService {
	private fb :any;
	private result :any;
	// private memberedGroup:any[] = [];
  constructor( @Inject(FirebaseRef) fb ,private af:AngularFire) {
  		
  		this.fb = fb;
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

    getMembersGroups(uid:string){
	return this.af.database.list('/members',
	    	{
	    		query:{
	    			orderByChild: uid
	    		}
	    	});
		
    }


    private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	  }

}
