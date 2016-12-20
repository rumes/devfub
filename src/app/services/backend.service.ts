// Service for creat and get record  from backend 
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BackendService {
	public result :any[] = [];

	private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

// passin url we can get the related records list
  getList(url:string):Promise<any[]>{
  	return this.http.get(url,{headers: this.headers})
  	.toPromise()
  	.then(response => response.json().data)
  	.catch(this.handleError);
                    
  }

// passin url and id we can get the related record by id
  getById(url:string,id:number):Promise<any>{
  	const getUrl = `${url}/${id}`;
  	return this.http.get(getUrl)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

// passin url and id we can delete the related record by id
  delete(url:string, id: number): Promise<void> {
    const delurl = `${url}/${id}`;
    return this.http.delete(delurl, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  // passin url and required data create record
  create(url:string,data: any[]): Promise<any> {
    return this.http
      .post(url, data, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

// handle errror in http calls
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
