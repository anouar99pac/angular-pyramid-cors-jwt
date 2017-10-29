import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthenticationService } from "app/shared/services/authentification/authentification.service";
import { User } from "app/shared/models/user";


@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getCredentials(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get credentials user from api
        return this.http.get('/api/neteven/credentials', options)
            .map((response: Response) => response.json());
            //.do(console.log('dd',response.json()))
    }
}