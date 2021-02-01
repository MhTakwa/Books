import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMenuComponent } from './admin-menu-books/admin-menu.component';
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BooksComponent } from './books/books.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { InscriptionComponent } from './authentication/authentication.component';
import { AuthGuard } from './helpers/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  ////books
  { path: 'books', component:  AdminMenuComponent,canActivate: [AuthGuard],children:[
    { path: 'add', component:  BookFormComponent,canActivate: [AuthGuard]},
  ]},
  /*{ path: 'admin/books/add', component:  BookFormComponent,canActivate: [AuthGuard]},
  { path: 'admin/books/edit/:id', component:  BookFormComponent,canActivate: [AuthGuard]},
  { path: 'admin/books/delete/:id', component:  BookFormComponent,canActivate: [AuthGuard]},
  { path: 'admin/books/delete/:id', component:  BookFormComponent,canActivate: [AuthGuard]},
  ////categories
  { path: 'admin/categories', component:  AdminMenuCategoriesComponent,outlet:'admin',canActivate: [AuthGuard]},
  { path: 'admin/categories/add', component:  CategoriesFormComponent,canActivate: [AuthGuard]},
  { path: 'admin/categories/edit/:id', component:  CategoriesFormComponent,canActivate: [AuthGuard]},
  { path: 'admin/categories/delete/:id', component:  CategoriesFormComponent,canActivate: [AuthGuard] },*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
