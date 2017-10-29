import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopMenuComponent } from "app/site/top-menu/top-menu.component";
import { ItemsComponent } from './site/items/items.component';
import { LoginComponent } from './site/login/login/login.component';
import { routing } from "routing/app.routing";
import { AuthSecurityService, authHttpServiceFactory } from "app/auth-security/auth-security.service";
import { UserService } from "app/shared/services/user/user.service";
import { AuthenticationService } from "app/shared/services/authentification/authentification.service";
import { LogoutComponent } from './site/logout/logout.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    ItemsComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
      AuthHttp,
      {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [ Http, RequestOptions ]
      },
      AuthSecurityService,
      AuthenticationService,
      UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
