import { Category } from "./category";

export interface Book {
  
    id?:number,
    title?:string,
    price?:number,
    author?:string,
    image?:any,
    imageName?:string,
    categories?:Category[]

}
