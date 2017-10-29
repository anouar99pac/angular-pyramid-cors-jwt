import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

// import { Commande } from './commande'

import {Http, Response } from '@angular/http';
import { Observable} from 'rxjs/Observable';
// import { of } from 'rxjs/add/observable/of';
import 'rxjs/add/observable/of';



@Injectable()
export class GridService {

    // data: Commande[];
    public data = new Array<String>();
    
    constructor(private router:Router, public http:Http) {
        console.log("Created an instance of commande service");
    }

    // getdata(): Promise<Commande[]>{
    // 	return Promise.resolve(this.data);
    // }

    
    getData(): Observable<String[]> {
    	console.log("commande from service")
    	console.log(this.data)
    	if(this.data == undefined || this.data.length==0){
    		console.log('commande undefined')
   //  		this.data = [
   //  		{id: 11, name: ' Commande Mr. Nice'},
			// {id: 12, name: ' Commande Narco'},
			// {id: 13, name: ' Commande Bombasto'},
			// {id: 14, name: ' Commande Celeritas'},
			// {id: 15, name: ' Commande Magneta'},
			// {id: 16, name: ' Commande RubberMan'},
			// {id: 17, name: ' Commande Dynama'},
			// {id: 18, name: ' Commande Dr IQ'},
			// {id: 19, name: ' Commande Magma'},
			// {id: 20, name: ' Commande Tornado'}
   //  		]
   			
	   		return this.getDataFromServer();

		                 

    	}else{
	    	return Observable.of(this.data);
    	}
    }

    private sucessCallback (response: Response) {
		let body = response.json();
		console.log("inside http appel");

		this.data = body.data || [];
    	console.log(this.data)
		
		return  body.data || [];

	}
    // getdata(): Commande[]{
    // 	return this.data;
    // }
    getDataFromServer(): Observable<String[]>{
    	return this.http.get('/get-heroes')
		                  .map(this.sucessCallback);
    }
}





