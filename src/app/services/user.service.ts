import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': "application/json"})
  };
  constructor(private _httpClient:HttpClient) { }
  register(user:User){
    return this._httpClient.post<User>("http://localhost:8000/api/users",user);
  }
  getUserByEmail(email:string){
    return this._httpClient.get<User>("http://localhost:8000/api/users?email="+email).pipe(
      map(item =>({id: item[0].id, email: item[0].email,roles:item[0].roles})
       
      ))
       
  }

}
