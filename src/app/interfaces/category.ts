import { Book } from "./book";

export interface Category {
    id?:number,
    label?:string
    products?:Book[]
}
