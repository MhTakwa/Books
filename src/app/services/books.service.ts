import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from '../interfaces/book';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json",
                                  
                                })
  };
  formoptions = {
    
      headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
      
  
  };
  constructor(private _httpClient:HttpClient) { }
  getBooks() {
     
    return this._httpClient.get<Book[]>("http://localhost:8000/api/books");
  }
  getBook(id:number){
    return this._httpClient.get<Book>("http://localhost:8000/api/books/"+id);
  }
  getBookEntity(book:any){
    return this._httpClient.get<Book>("http://localhost:8000"+book);
  }
  addBook(book:any){ console.log(book)
    return this._httpClient.post<Book>("http://localhost:8000/api/books",book);
  }
  editBook(id:number,book){ console.log(book)
    return this._httpClient.patch<Book>("http://localhost:8000/api/books/"+id,book,this.httpOptions);
  }
  deleteBook(id:number){
    return this._httpClient.delete<Book>("http://localhost:8000/api/books/"+id);
  }
  
}
