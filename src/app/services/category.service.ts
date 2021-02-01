import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': "application/merge-patch+json"})
  };
  auth={
    headers:new HttpHeaders( { Authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTA5OTI2NjAsImV4cCI6MTYxMDk5NjI2MCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRha3dhQHRha3dhLmNvbSJ9.G4VYbZaXbSvhGEuL45CtFqabdUANImo2Ngr-NwQvkfu5MOhlkWABL2aroWYua9psgP-cEkbLyAhX8hmuNgQ9JAWX4JLZYyShMXTi6KyMA9G3I6V_uj2dYrHFwU940S4CG0NzGeGiFOEM1484fyHMi-iuJewvhEqfEPz0t6G4RzERCb93nqpJ71pgfo5wgjatE9m9rwYWoWbu0E88N9D8iFF4zBPV6mOc9hi7HqTiIi4u6efP1an2JJTeAwq0ShtfeGF3HeSo9Q0n80LjLSTHuJbsVglTI4uphYn57cVT3TZR494AbY4VS-PSEchTk8cIiwKUJelSEmFNabyBg8sfLhPeoa2HCzVacvJp6BcsssfxQayZr1yxT8usdpX-EjcYrMpq0UTT_1FTWJPUfYKMKyU5EyPRosOSgB0QSiQfRF5XP_u4Zf1n45kJChtnvQpUbf137l5zPxxj0W802gdSJxdXM7tc6BTympyG-V1RHNjtV4xwcCuOu83wofJKSVAuwBo5oeWM02oJ2qhVy_VjTCUPROe3F0Su2LBYGOPfAT4vXRbBOIOVlQQsk1hb0Zugc8RsRCrGbli2GPwRTfzQdcuayz2HMQ5GDrJcq4JCLjNv-qEe1bbKvB-aPC1OtSGHeC4-tbBHzTJlvXxZ2K2FB4WWHtcSh4KebP15VPGW1_w"})
  };
  constructor(private _httpClient:HttpClient,private authenticationService:AuthenticationService) { }
  getCategories() {
     
    return this._httpClient.get<Category[]>("http://localhost:8000/api/categories");
  }
  getCategoryById(id:number){
    return this._httpClient.get<Category>("http://localhost:8000/api/categories/"+id);
  }
  getCategory(cat:any){
    return this._httpClient.get<Category>("http://localhost:8000"+cat);
  }
  addcategory(category:Category){
    return this._httpClient.post<Category>("http://localhost:8000/api/categories",category,);
  }
  editcategory(category:Category){
    return this._httpClient.patch<Category>("http://localhost:8000/api/categories/"+category.id,category,this.httpOptions);
  }
  deleteCategory(id:number){
    return this._httpClient.delete<Category>("http://localhost:8000/api/categories/"+id);
  }
}
