import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'projects/shared/src/service/api.service';
import { SubCategoryComponent } from '../../attribute/sub-category/sub-category.component';
import { Category } from 'projects/shared/src/models/attribute.model';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { PolicyAndMisc } from 'projects/shared/src/models/policy&misc.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-policy-add',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './policy-add.component.html',
  styleUrl: './policy-add.component.scss'
})
export class PolicyAddComponent {
  policy:FormGroup;
  categoryList:Category[]=[];

  fileName: string | null = null;
  fileSizeFormatted: string | null = null;
  constructor(private apiService:ApiService,private fb: FormBuilder,private toastr:ToastrService,private dailogRef:MatDialogRef<PolicyAddComponent>){
      this.getCategory();
      this.createForm();
    }
   createForm(){
      this.policy = this.fb.group({
        type: ['', [Validators.required]],
        category: ['', [Validators.required]],
        file: [null, [Validators.required]],
        remarks: [''],
      });
    }
    getCategory(){
      this.apiService.getWithHeaders('attribute/category').subscribe(res =>{
        if(res){
          this.categoryList=res;
        }
      })
    }
    getReadableFileSize(size: number): string {
      if (size < 1024) return `${size} bytes`;
      else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
      else return `${(size / 1048576).toFixed(2)} MB`;
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input?.files?.length) {
        const file = input.files[0];
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (allowedTypes.includes(file.type)) {
          this.fileName = file.name;
          this.fileSizeFormatted = this.getReadableFileSize(file.size);
          this.policy.patchValue({
            file: file
          });
        } else {
          this.fileName = null;
          this.fileSizeFormatted = null;
          alert('Invalid file type! Only PDF, Word, and Excel files are allowed.');
        }
      }
    }
    save(){

    }
    close(){
      this.dailogRef.close(true);
    }
    reset(){
      this.createForm();
    }
}
