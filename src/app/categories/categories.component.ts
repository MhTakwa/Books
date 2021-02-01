import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }
categories:Category[];
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    return this.categoryService.getCategories().subscribe(res=>this.categories=res);
  }
  getBooksByCat(){
    console.log('click');
  }

}
