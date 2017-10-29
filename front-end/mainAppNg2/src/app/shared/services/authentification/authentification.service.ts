import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { User } from "app/shared/models/user";
import { AuthHttp, tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    public token: string;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http, private authHttp: AuthHttp, private router : Router) {
        // set token if saved in session storage
        var currentUser = JSON.parse(sessionStorage.getItem('currentSession'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        let credentials = JSON.stringify({ username: username, password: password });
        return this.http.post('/api/neteven/json-web-token', credentials )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in session storage to keep user logged in between page refreshes
                    console.warn('okokokokokokok session');
                    sessionStorage.setItem('currentSession', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from session storage to log user out
        this.token = null;
        sessionStorage.removeItem('currentSession');
        this.router.navigate(['/login']);
    }

    isLoggedObs(){
      if (sessionStorage.getItem('currentSession')){
        // logged in so return true
        if (this.loggedIn()){
            return Observable.of(true);
        }
    }
      return  Observable.of(false);
    }

    loggedIn(){
        // This function simply checks the expiry date of the JWT and returns true
        // if it is not expired.
        // so why in the function of tokenNotExpired, it check by default
        // localStorage don't sessionStorage I need to define params like that
        let token = JSON.parse(sessionStorage.getItem('currentSession')).token
        if(token != null && token != undefined){
            return tokenNotExpired(null, token);
        }
        return false;
    }

    useJwtHelper() {
            console.warn(this.token);
            console.log(
              this.jwtHelper.decodeToken(this.token),
              this.jwtHelper.getTokenExpirationDate(this.token),
              this.jwtHelper.isTokenExpired(this.token)
        );
    }

    getUserCredentials(){
        if (this.loggedIn()){
            return this.jwtHelper.decodeToken(this.token);
        }
        else{
            return null;
        }
    }

    tokenSubscription() {
        this.authHttp.tokenStream.subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Complete')
          );
    }

}
