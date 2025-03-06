import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Eqpt, SubCategory } from 'projects/shared/src/models/attribute.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-emer-add',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './emer-add.component.html',
  styleUrl: './emer-add.component.scss'
})
export class EmerAddComponent {
  emerForm:FormGroup;
  categoryList:Category[]=[];
  subCategoryList:SubCategory[]=[];
  eqptList:Eqpt[]=[];
  constructor(private apiService:ApiService,private fb: FormBuilder){
     this.emerForm = this.fb.group({
          emerNumber: ['', [Validators.required]],
          subject: ['', [Validators.required]],
          subFunction: [''],
          emerSubFunction: [''],
          category: [''],
          subCategory: [''],
          eqpt: [''],
          emerFile: [''],
          metaInformation: [''],
        });
        this.getCategory();
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
    let categoryId = this.emerForm.get("category")?.value;
    this.apiService.getWithHeaders('attribute/eqpt'+categoryId+"/"+subCategoryId).subscribe(res =>{
      if(res){
        this.eqptList=res;
      }
    })
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // You can handle the file upload here, for example, saving it in the form control
  }
  save(){

  }
}
