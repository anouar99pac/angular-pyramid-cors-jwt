import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "app/shared/services/authentification/authentification.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authentificationService : AuthenticationService) { }

  ngOnInit() {
    this.authentificationService.logout();
  }

}
