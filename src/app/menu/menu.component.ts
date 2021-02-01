import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser: User;
  isAdmin:boolean
    constructor(private authenticationService:AuthenticationService,private router:Router) {
    
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    
   
   }
  
  ngOnInit(): void {
      this.isAdmin=false
      if(this.currentUser)
        this.router.events.subscribe(event=>this.isAdminRole())
      
  }

  isAdminRole(){
    
      if(this.authenticationService.getConnectedUser().roles.includes('ROLE_ADMIN'))
          
          this.isAdmin=true
}


}
