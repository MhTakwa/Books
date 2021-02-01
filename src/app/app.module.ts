import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AdminMenuComponent } from './admin-menu-books/admin-menu.component';
import { MenuComponent } from './menu/menu.component';
import { CategoriesComponent } from './categories/categories.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { Select2Module } from "ng-select2-component";
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { InscriptionComponent } from './authentication/authentication.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AdminMenuComponent,
    MenuComponent,
    CategoriesComponent,
    BookDetailComponent,
    BookFormComponent,
    AdminMenuCategoriesComponent,
    CategoriesFormComponent,
    InscriptionComponent,
    HomeComponent,
    ProfileComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
