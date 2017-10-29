import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { AuthenticationService } from "app/shared/services/authentification/authentification.service";

@Injectable()
export class AuthSecurityService implements CanActivate {
  
  constructor(private router: Router, private authentification: AuthenticationService) { }
  
  canActivate() {
      // indication for the front end that the user is "authenticated" is 
      // if they have an unexpired JWT
      if (sessionStorage.getItem('currentSession')){
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page
      this.router.navigate(['/logout']);
      return false;
  }
}


// Configuration of our AuthHttp building

let configParams = {
    headerName: 'Authorization',
    headerPrefix: 'bearer',
    tokenName: 'token',
		tokenGetter: (() => JSON.parse(sessionStorage.getItem('currentSession')).token),
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: false
  }

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig(configParams), http, options);
}