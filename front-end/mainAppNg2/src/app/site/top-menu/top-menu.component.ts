import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from "app/shared/services/authentification/authentification.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  
  isLogged$:Observable<boolean>;
  constructor(private authentificationService: AuthenticationService) { }
  
  ngOnInit() {
    this.isLogged$ = this.isLogged();
  }

  isLogged(){
      return this.authentificationService.isLoggedObs();
    }

}
