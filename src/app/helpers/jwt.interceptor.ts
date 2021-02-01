import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        request.headers.set("Access-Control-Allow-Origin","*")
        let currentUser = this.authenticationService.currentUserValue;
         if (currentUser && currentUser.token) {
           
            request = request.clone({
              setHeaders: { "Authorization": `Bearer ${currentUser.token}`,
            
             }
            });
        }
      //  console.log(request.headers)
        return next.handle(request);
    }
}