import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/book';
import { Category } from '../interfaces/category';
import { BooksService } from '../services/books.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book:Book;
  categories:Category[]=[];
  constructor(private bookService:BooksService,private route: ActivatedRoute,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getBook(params['id']); 


   });
  }
  getBook(id:number){
    this.bookService.getBook(id).subscribe(res=>
      {this.book=res
      this.getBookCategories(this.book.id)})      
  }
  getBookCategories(id:number){
    this.book.categories.forEach(cat => {
      this.categoryService.getCategory(cat).subscribe(res=>this.categories.push(res));
    });
     
  }
}
