
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import { Book } from '../interfaces/book';
import { Category } from '../interfaces/category';
import { BooksService } from '../services/books.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book:Book={};
  categories:any[]=[]
  bookForm:FormGroup;
  isEditForm:boolean=false;
  data: Select2Data = []
  selected = []
  fileData: File = null;
  previewUrl:any = null;
  uploadedFilePath: string = null;
  form:FormData
  constructor(private bookService:BooksService,private categoryService:CategoryService
    ,private router:Router,private activeRoute:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
     
    this.activeRoute.params.subscribe(params => {

      this.createForm(this.book)
      if(params['id']!=null){
        if(this.router.url.includes('edit')){
          this.isEditForm=true;
          this.
          getBook(params['id'])
        }
        else{
          this.deleteBook(params['id']);
        }

        
       
      }
   });
    this.getCategories()
  }
  createForm(book:Book){

    
    this.bookForm = new FormGroup({
      title: new FormControl(book.title,Validators.required),
      price: new FormControl(book.price,Validators.required),
      author: new FormControl(book.author,Validators.required),
      image:new FormControl(book.image),
      categories:new FormControl(book.categories,Validators.required)
      });
  }
  getCategories(){
    return this.categoryService.getCategories().subscribe(res=>{
     res.forEach(elem=>{
        this.data.push( {
        value: elem.id, 
        label: elem.label, 
    })
     }) 
    });
  }
  
  addBook(){
    this.bookForm.controls.categories.value.forEach(id => {
     // this.categories.push('/api/categories/'+id)
     this.categories.push(id)
    });
    this.form=new FormData()
    this.form.append('image',this.fileData)
    this.form.append('title',this.bookForm.controls.title.value)
    this.form.append('price',this.bookForm.controls.price.value)
    this.form.append('author',this.bookForm.controls.author.value)
    this.form.append('categories',JSON.stringify(this.categories));
      this.book={title:this.bookForm.controls.title.value,
      price:parseFloat(this.bookForm.controls.price.value),
      author:this.bookForm.controls.author.value,
      image:this.form,
      categories:this.categories};
    console.log(this.bookForm.controls.image.value)
    this.bookService.addBook(this.form).subscribe({
      next: data => {
        console.log(data)
        this.router.navigate(['/admin/books']);
         
      },
      error: error => {
        console.error('There was an error!', error);
      }
  });
  }
  getBook(id:number){
    this.bookService.getBook(id).subscribe(res=>
      { this.createForm(res);console.log(res)
        this.book=res
        this.getBookCategories(id)
        
  })

}
getBookCategories(id:number){
  this.book.categories.forEach(cat => {
    this.categoryService.getCategory(cat).subscribe(res=>{
      this.selected.push(res.id)
      this.bookForm.controls.categories.setValue(this.selected)
    
  });
   
});
}
editBook(){
  this.bookForm.controls.categories.value.forEach(id => {
   // this.categories.push('/api/categories/'+id)
    this.categories.push(id)
  });

   this.book={
    id:this.book.id,
    title:this.bookForm.controls.title.value,
    price:parseFloat(this.bookForm.controls.price.value),
    author:this.bookForm.controls.author.value,
    image:this.fileData,
    categories:this.categories};
    this.form=new FormData()
    this.form.append('image',this.fileData)
    this.form.append('book',JSON.stringify(this.book))
    
  this.bookService.editBook(this.book.id,this.form).subscribe({
    next: data => {
      console.log(data)
    
      this.router.navigate(['/admin/books']);
       
    },
    error: error => {
      console.error('There was an error!', error);
    }
});
}
FormBookSubmit(){
  if(!this.isEditForm){
      this.addBook()
  }else
 this.editBook();
}

deleteBook(id:number){
  this.bookService.deleteBook(id).subscribe({
    next: data => {
        console.log(data)
        this.router.navigate(['/admin/books']);
       
    },
    error: error => {
      console.error('There was an error!', error);
    }
});
  
}
fileProgress(fileInput: any) {
  this.fileData = <File>fileInput.target.files[0];
  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
   console.log(this.fileData)
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
   // this.uploadFileToUrl(this.fileData," ")
  }

}


}

