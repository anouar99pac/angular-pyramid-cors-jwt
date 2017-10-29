import { Component, OnInit } from '@angular/core';
import { User } from "app/shared/models/user";
import { UserService } from "app/shared/services/user/user.service";
import 'app/imports/rxjs-operators';
import { AuthHttp } from 'angular2-jwt';


@Component({
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  users: User[] = [];
  stuff = [];

  constructor(private userService: UserService, private authHttp: AuthHttp) { }

  ngOnInit() {
    this.userService.getCredentials()
      .subscribe(
        users => this.users = users);
  }
    
  testAuthHttp(){
    // add authorization header with jwt token

    this.authHttp.get('/api/neteven/get-test')
      .map(res => res.json())
      .subscribe(
        data =>  this.stuff = data.stuff,
        error => console.log(error),
        () => console.log('Request Complete')
      );
  }

}


// Test API BackEnd Voici quelques cas d’utilisation de l’API via l’utilitaire cURL :
// Cas 1 : accès à une ressource protégée sans jeton :
// $ curl http://localhost:8000/api/restricted/accounts
// {
//   "status": "error",
//   "msg": "Jeton invalide",
//   "url": "/api/restricted/accounts"
// }
// Cas 2 : authentification avec récupération d’un jeton :
// $ curl -X POST --data "username=demo1&password=Demo2015" http://localhost:8000/api/authenticate
// {
//   "status": "ok",
//   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRlbW8xIiwiZn"
// }
// Cas 3 : accès à une ressource protégée avec un jeton valide :
// $ curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRlbW8xIiwiZn" \
//         http://localhost:8000/api/restricted/accounts
// [
//   {
//     "id": 0,
//     "name": "Account 0"
//   },
//   {
//     "id": 1,
//     "name": "Account 1"
//   }
// ]