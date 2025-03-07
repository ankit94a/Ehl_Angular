import { Category, Eqpt, SubCategory } from 'projects/shared/src/models/attribute.model';
import { PolicyAddComponent } from './../policy-add/policy-add.component';
import { Component } from '@angular/core';
import { FilterModel, PolicyAndMisc } from 'projects/shared/src/models/policy&misc.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.scss'
})
export class PolicyListComponent {
  policyList:PolicyAndMisc[]=[];
  categoryList:Category[]=[];
  subCategoryList:SubCategory[]=[];
  eqptList:Eqpt[]=[];
  filterModel:FilterModel = new FilterModel();
  constructor(private dialogService:BISMatDialogService,private apiService:ApiService){
    this.getCategory();
  }

  openDailog(){
    this.dialogService.open(PolicyAddComponent,null,'50vw').then(res =>{
      if(res){

      }
    })
  }
  getCategory(){
    this.apiService.getWithHeaders('attribute/category').subscribe(res =>{
      if(res){
        this.categoryList=res;
      }
    })
  }
  getSubCategory(categoryId){
    this.apiService.getWithHeaders('attribute/subcategory'+categoryId).subscribe(res =>{
      if(res){
        this.subCategoryList=res;
      }
    })
  }
  getEqpt(subCategoryId){
    // let categoryId = this.emerForm.get("category")?.value;
    this.apiService.getWithHeaders('attribute/eqpt'+this.filterModel.categoryId+"/"+subCategoryId).subscribe(res =>{
      if(res){
        this.eqptList=res;
      }
    })
  }
}
