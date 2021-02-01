import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import { Category } from '../interfaces/category';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  category:Category={};
  currentUser: User;
  categoryForm:FormGroup;
  isEditForm:boolean=false;
  unique:boolean=true
  constructor(private categoryService:CategoryService,private router:Router,
    private activeRoute:ActivatedRoute,private authenticationService:AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {

      this.createForm(this.category)
      if(params['id']!=null){
        if(this.router.url.includes('edit')){
          this.isEditForm=true;
          this.getCategory(params['id'])
        }
        else{
          this.deleteCategory(params['id']);
        }}});
       //  this.categoryForm.errors.new(this.categoryForm.controls.label.)
        
       
  }
  getCategory(id:number){
     this.categoryService.getCategoryById(id).subscribe(res=>{this.category=res;this.createForm(this.category)})
  }
  createForm(category:Category){
    this.categoryForm = new FormGroup({
      label: new FormControl(category.label,Validators.required),
      });
     // this.categoryForm.controls['label'].setAsyncValidators(ValidateEmailNotTaken.createValidator(this.customerService, this.customerId));
  }
  addCategory(){
    this.category={label:this.categoryForm.controls.label.value};
    
    this.categoryService.addcategory(this.category).subscribe({
      next: data => {
        console.log(data)
        this.router.navigate(['/admin/categories']);
         
      },
      error: error => {
        if(error.error.violations[0].message=="Label already exists")
            this.unique=false
        console.error('There was an error!', error);
      }
  });
  }
  FormcategorySubmit(){
   if(!this.isEditForm)
      this.addCategory();
    this.editCategory(this.category)    
  }
  editCategory(category:Category){
    this.category={
      id:category.id,
      label:this.categoryForm.controls.label.value};
    
    this.categoryService.editcategory(this.category).subscribe({
      next: data => {

        this.router.navigate(['/admin/categories']);
         
      },
      error: error => {
        if(error.error.violations[0].message=="Label already exists")
            this.unique=false
        console.log('There was an error!', error);
      }
  });
  }
  deleteCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe({
      next: data => {
          console.log(data)
          this.router.navigate(['/admin/categories']);
         
      },
      error: error => {
        console.error('There was an error!', error);
      }
  });
  }
  }


