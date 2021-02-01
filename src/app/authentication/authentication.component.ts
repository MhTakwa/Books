import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class InscriptionComponent implements OnInit {
  user:User={}
  inscription:FormGroup;
  login:FormGroup
  unique:boolean=true
  login_prob:boolean=true
  constructor(private formBuilder:FormBuilder,private userService:UserService,
    private authenticationService:AuthenticationService,private router:Router,
    private route:ActivatedRoute) {
      
   }
  
  ngOnInit(): void {
    this.inscription = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required ]],});

    this.login=this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createAccount(){
    this.user={
      name:this.inscription.controls.name.value,
      lastname:this.inscription.controls.lastName.value,
      email:this.inscription.controls.email.value,
      password:this.inscription.controls.password.value

    } 
    this.userService.register(this.user).subscribe({
      next: data => {
        console.log(data)
      //this.router.navigate(['/profile'])
      
         
      },
      error: error => {
        if(error.error.violations[0].message=="Label already exists")
            this.unique=false
        console.log('There was an error!', error);
       
      }
  });
  }
  authenticate(){
    this.user={
      email:this.login.controls.email.value,
      password:this.login.controls.password.value
    } 
  
  this.authenticationService.login(this.user).subscribe({
      next: data => {
        console.log(data)
       // this.router.navigate(['/profile'])
        this.userRedirect()

         
      },
      error: error => {
        if(error.status==401)
            this.login_prob=false
        console.error('There was an error!', error.status);
      }
  });
  
  }

userRedirect(){
  this.userService.getUserByEmail(JSON.parse(localStorage.getItem("email"))).subscribe(res=>{
    if(res.roles.includes('ROLE_ADMIN'))
      this.router.navigate(['/admin/categories'])
    else
      this.router.navigate(['/shop'])
 
  })
    /*if(this.authenticationService.getConnectedUser().roles.includes('ROLE_ADMIN'))
        this.router.navigate(['/admin/categories'])
    else
        this.router.navigate(['/shop'])*/
  
 
}

}
