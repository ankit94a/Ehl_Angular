import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Category, Wing } from 'projects/shared/src/models/attribute.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { AuthService } from 'projects/shared/src/service/auth.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-emer-index-add',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './emer-index-add.component.html',
  styleUrl: './emer-index-add.component.scss'
})
export class EmerIndexAddComponent {
  emerForm: FormGroup;
  wingId:number;
  fileName: string | null = null;
  fileSizeFormatted: string | null = null;
  categoryList: Category[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) data,private authService:AuthService,private apiService: ApiService,private fb: FormBuilder,private toastr: ToastrService,private dialogRef: MatDialogRef<EmerIndexAddComponent>){
    this.wingId = parseInt(this.authService.getWingId());
    // this.createForm();
    if(data){
      this.bindDataToForm(data.data);
    }else{
      this.createForm();
    }
  }
  bindDataToForm(form) {
    this.getCategory()

     this.emerForm = this.fb.group({
      emerNumber: [form.emerNumber, [Validators.required]],
      subject: [form.subject, [Validators.required]],
      category: [form.category, [Validators.required]],
      categoryId: [form.categoryId, [Validators.required]],
      id: [form.id],
      wingId: [form.wingId, [Validators.required]],
      Wing: [form.wing, [Validators.required]],
      emerFile: [form.emerFile, [Validators.required]],


    });

  }
   createForm() {
      this.emerForm = this.fb.group({
        emerNumber: ['', [Validators.required]],
        subject: ['', [Validators.required]],
        category: [''],
        wing: [''],
        wingId: [{ value: this.wingId, disabled: true }, [Validators.required]],
        categoryId: ['', [Validators.required]],
        emerFile: [null, [Validators.required]],
      });
    }
    getCategory() {
      this.apiService.getWithHeaders('attribute/category' + this.wingId).subscribe((res) => {
          if (res) {
            this.categoryList = res;
          }
        });
    }
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input?.files?.length) {
        const file = input.files[0];
        const allowedTypes = ['application/pdf','application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        if (allowedTypes.includes(file.type)) {
          this.fileName = file.name;
          this.fileSizeFormatted = this.getReadableFileSize(file.size);
          this.emerForm.patchValue({
            emerFile: file,
          });
        } else {
          this.fileName = null;
          this.fileSizeFormatted = null;
          alert('Invalid file type! Only PDF, Word, and Excel files are allowed.');
        }
      }
    }
    getReadableFileSize(size: number): string {
      if (size < 1024) return `${size} bytes`;
      else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
      else return `${(size / 1048576).toFixed(2)} MB`;
    }
    removeFile(): void {
      this.fileName = null;
      this.fileSizeFormatted = null;
      this.emerForm.patchValue({
        emerFile: null,
      });
      // Clear the file input as well
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
    close() {
      this.dialogRef.close(true);
    }
    reset() {
      this.createForm();
    }
    save() {

      const formData = new FormData();

      const wingId = this.emerForm.get('wingId')?.value;
      const emerId= this.emerForm.get('id')?.value;
      const categoryId = this.emerForm.get('categoryId')?.value;
      const category = this.categoryList.find(item => item.id == categoryId)?.name || '';
      formData.append('category', category);
      if (this.emerForm.valid) {
        formData.append('emerNumber', this.emerForm.get('emerNumber')?.value);
        formData.append('subject', this.emerForm.get('subject')?.value);
        formData.append('subFunction', this.emerForm.get('subFunction')?.value);
        formData.append('wingId', wingId);
        formData.append('categoryId', categoryId);
        formData.append('subFunctionCategory', this.emerForm.get('subFunctionCategory')?.value);
        formData.append('subFunctionType', this.emerForm.get('subFunctionType')?.value);
        formData.append('eqpt', this.emerForm.get('eqpt')?.value);
        formData.append('remarks', this.emerForm.get('remarks')?.value);
        const fileInput = this.emerForm.get('emerFile')?.value;
        if (fileInput) {
          formData.append('emerFile', fileInput, fileInput.name);
        }
        let apiUrl = ''
        if (emerId) {
          formData.append('id', emerId);
          apiUrl='emer/index/update';
        }else{
          apiUrl='emer/index';
        }
        this.apiService.postWithHeader(apiUrl, formData).subscribe({
          next: (res) => {
            this.toastr.success('Form submitted successfully', 'Success');
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error submitting form:', err);
            this.toastr.error('Error submitting form', 'Error');
          }
        });
      }
    }
}
