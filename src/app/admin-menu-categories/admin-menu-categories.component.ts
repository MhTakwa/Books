import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../interfaces/category';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-admin-menu-categories',
  templateUrl: './admin-menu-categories.component.html',
  styleUrls: ['./admin-menu-categories.component.css']
})
export class AdminMenuCategoriesComponent implements OnInit {
  categories:Category[];
  currentUser: User;
  constructor(private categoryService:CategoryService,private router:Router,private authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    
   }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(res=>{
      this.categories=res
    
    });
  }
  editcategory(category:Category){
    this.router.navigate(['/admin/categories/edit/',category.id]);
  }

}
