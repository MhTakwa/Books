import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../interfaces/book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  books:Book[];
 
  constructor(private bookSevice:BooksService,private router:Router) { }

  ngOnInit(): void {
   this.getBooks();
  }
  getBooks(){
    this.bookSevice.getBooks().subscribe(res=>this.books=res);
  }
  editBook(book:Book){
    console.log(book)
    this.router.navigate(['/admin/books/edit/',book.id]);
  }
}
