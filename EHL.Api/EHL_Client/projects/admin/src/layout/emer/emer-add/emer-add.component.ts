import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category, Eqpt, SubCategory } from 'projects/shared/src/models/attribute.model';
import { EmerModel } from 'projects/shared/src/models/emer.model';
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
  fileName: string | null = null;
  fileSizeFormatted: string | null = null;
  constructor(private apiService:ApiService,private fb: FormBuilder,private dialogRef:MatDialogRef<EmerAddComponent>,private toastr:ToastrService){
        this.createForm();
        this.getCategory();
  }
  createForm(){
    this.emerForm = this.fb.group({
      emerNumber: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      subFunction: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      eqpt: ['', [Validators.required]],
      emerFile: [null, [Validators.required]],
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
        this.emerForm.patchValue({
          emerFile: file
        });
      } else {
        this.fileName = null;
        this.fileSizeFormatted = null;
        alert('Invalid file type! Only PDF, Word, and Excel files are allowed.');
      }
    }
  }

  save() {
    if (this.emerForm.valid) {
      const formData = new FormData();

      // Append regular form fields to FormData
      formData.append('emerNumber', this.emerForm.get('emerNumber')?.value);
      formData.append('subject', this.emerForm.get('subject')?.value);
      formData.append('subFunction', this.emerForm.get('subFunction')?.value);
      formData.append('category', this.emerForm.get('category')?.value);
      formData.append('subCategory', this.emerForm.get('subCategory')?.value);
      formData.append('eqpt', this.emerForm.get('eqpt')?.value);
      formData.append('metaInformation', this.emerForm.get('metaInformation')?.value);

      // Append the file to FormData
      const fileInput = this.emerForm.get('emerFile')?.value;
      if (fileInput) {
        formData.append('emerFile', fileInput, fileInput.name); // Append the file
      }

      // Make the POST request with FormData
      this.apiService.postWithHeader('emer', formData).subscribe({
        next: (res) => {
          this.toastr.success('Form submitted successfully', 'Success');
        },
        error: (err) => {
          this.toastr.error('Error submitting form', 'Error');
        }
      });
    }
  }

  close(){
    this.dialogRef.close(true);
  }
  reset(){
    this.createForm();
  }
}
