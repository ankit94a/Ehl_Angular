import { Category } from "./attribute.model";
import { BaseModel } from "./base.model";

export class PolicyAndMisc extends BaseModel{
  type:any;
  category:Category;
  file:any;
  remarks:string;
}

export class FilterModel {
  category:string;
  categoryId:number;
  subCategory:string;
  subCategoryId:number;
  eqpt:string;
  eqptId:number;
  searchText:string;
}
