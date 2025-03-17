import { BaseModel } from "./base.model";

export class Wing extends BaseModel{
  name:string;
}
export class Category extends Wing{
  wingId:number;
}
export class SubCategory extends Category{
  categoryId:number;
}
export class Eqpt extends SubCategory{
  subCategoryId:number;
}
