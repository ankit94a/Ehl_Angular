import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category, SubCategory } from 'projects/shared/src/models/attribute.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent {
  subCategory:SubCategory=new SubCategory();
  categoryList:Category[]=[];
  categoryId:number;
  constructor(private apiService:ApiService,private toastr:ToastrService,private dailogRef:MatDialogRef<SubCategoryComponent>){
    this.getCategory();
  }

  getCategory(){
    this.apiService.getWithHeaders('attribute/category').subscribe(res =>{
      if(res){
        this.categoryList=res;

      }
    })
  }
  save(){
    this.apiService.postWithHeader('attribute/subcategory',this.subCategory).subscribe(res =>{
      if(res){
        this.toastr.success("Sub-Category added successfully",'success');
        this.dailogRef.close(true);
      }
    })
  }
}
