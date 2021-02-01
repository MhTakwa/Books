import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser:User
  constructor(private authenticationService:AuthenticationService,private router:Router) { 
 //   this.authenticationService.getConnectedUser().subscribe(x=>this.currentUser=x);
  }

  ngOnInit(): void {
    this.currentUser=this.authenticationService.getConnectedUser();
    console.log(this.currentUser)
  }
  logout() {
    
    this.authenticationService.logout();
    this.router.navigate(['/shop'])
  
   
}
}
