import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': "application/json"})
  };
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  user:User={}
  constructor(private _httpClient:HttpClient,private userService:UserService) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
}
 
  login(user:User){
    return this._httpClient.post<User>("http://localhost:8000/api/login",user,this.httpOptions).pipe(map(data => {
      localStorage.setItem('currentUser', JSON.stringify(data))
      localStorage.setItem('email',JSON.stringify(user.email))
      this.currentUserSubject.next(data)
       this.ConnectedUser(user.email)
      return data ;
    }

      ));
 
 
  }
 ConnectedUser(email:string){
  this.userService.getUserByEmail(email).subscribe(res=>{
    localStorage.setItem('user',JSON.stringify(res))
 
  })
}
 public getConnectedUser(){
    return JSON.parse(localStorage.getItem("user")) 
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user')
    this.currentUserSubject.next(null);
    
}
}
