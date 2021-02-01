
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/book';
import { Category } from '../interfaces/category';
import { BooksService } from '../services/books.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
  constructor(private bookSevice:BooksService,private route: ActivatedRoute,private categoryService:CategoryService) { }
   books:Book[];
   category:Category;
  ngOnInit(): void {
   
    this.getBooks();
    this.route.params.subscribe(params => {
    this.getBooksByCat(params['id']); 
   });
  
  }
  getBooks(){
    this.bookSevice.getBooks().subscribe(res=>this.books=res);
  }
  getBooksByCat(id:number){
    if(id!=null){
     
      this.categoryService.getCategoryById(id).subscribe(res=>{
        this.books=[]
       res.products.forEach(book => { console.log(book)
        this.bookSevice.getBookEntity(book).subscribe(res=>this.books.push(res));
        
      });
    }); 
    }
   
  //  console.log(this.category)
  
  }
  
  }



