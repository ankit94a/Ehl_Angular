import { BaseModel } from "./base.model";

export class EmerModel extends BaseModel {
  EmerNumber: string;
  Subject: string;
  SubFunction: string;
  Category: number;  // long in C# can be represented as number in TypeScript
  SubCategory: number;  // long in C# can be represented as number in TypeScript
  Eqpt: string;
  EmerFile: string;
  MetaInformation: string;
  FileId: number
}

export class MasterSheetModel extends BaseModel {
  wing:string;
  wingId:number;
  category:string;
  categoryId:number;
  subCategory:string;
  subCategoryId:number;
  eqpt:string;
  eqptId:number;
  emerNumber:string;
}
