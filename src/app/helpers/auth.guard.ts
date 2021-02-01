import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            return this.isAdmin()
        }
        this.router.navigate(['/authentication'], { queryParams: { returnUrl: state.url }});
        return false;
    }
     isAdmin(){
       
        if(this.authenticationService.getConnectedUser().roles.includes('ROLE_ADMIN'))
              return true
  
        return false
    }
}