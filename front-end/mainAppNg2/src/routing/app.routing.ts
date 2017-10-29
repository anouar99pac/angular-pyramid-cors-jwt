import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "app/site/login/login/login.component";
import { ItemsComponent } from "app/site/items/items.component";
import { AuthSecurityService } from "app/auth-security/auth-security.service";
import { LogoutComponent } from "app/site/logout/logout.component";


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', component: ItemsComponent, canActivate: [AuthSecurityService] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);