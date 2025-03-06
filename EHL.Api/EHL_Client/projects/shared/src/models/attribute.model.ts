import { BaseModel } from "./base.model";

export class Category extends BaseModel{
  name:string;
}
export class SubCategory extends Category{
  categoryId:number;
}
export class Eqpt extends SubCategory{
  subCategoryId:number;
}
