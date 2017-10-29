import { Component } from '@angular/core';
import { AuthenticationService } from "app/shared/services/authentification/authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthenticationService]
  
})
export class AppComponent {
  title = 'app';
}
