import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,throwError } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        return next.handle(request).pipe(catchError(err => {
         //  console.log(err.status)
            if (err.status === 401) {
              //  this.authenticationService.login(this.authenticationService.getConnectedUser())
               // next.handle(request)
            //    console.log(err)
                // auto logout if 401 response returned from api
              //  this.authenticationService.logout();
                //location.reload(true);
            }
            
            //const error = err.error.message || err.statusText;
         
            return throwError(err);
        }))
    }
}