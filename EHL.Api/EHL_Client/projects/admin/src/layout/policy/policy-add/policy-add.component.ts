import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'projects/shared/src/service/api.service';
import { Category, Wing } from 'projects/shared/src/models/attribute.model';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-policy-add',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './policy-add.component.html',
  styleUrl: './policy-add.component.scss',
})
export class PolicyAddComponent {
  policy: FormGroup;
  categoryList: Category[] = [];
  wingList: Wing[] = [];
  fileName: string | null = null;
  fileSizeFormatted: string | null = null;
  constructor(private dialogRef:MatDialogRef<PolicyAddComponent>, private apiService: ApiService,private fb: FormBuilder,private toastr: ToastrService,private dailogRef: MatDialogRef<PolicyAddComponent>) {
    this.getWings();
    this.createForm();
  }
  createForm() {
    this.policy = this.fb.group({
      type: ['', [Validators.required]],
      wingId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      policyFile: [null, [Validators.required]],
      remarks: [''],
    });
  }
  save() {
    const formData = new FormData();
    var wing = this.wingList.find(
      (item) => item.id == this.policy.get('wingId')?.value
    ).name;
    var category = this.categoryList.find(
      (item) => item.id == this.policy.get('categoryId')?.value
    ).name;

    formData.append('wing', wing);
    formData.append('category', category);
    if (this.policy.valid) {
      formData.append('type', this.policy.get('type')?.value);
      formData.append('wingId', this.policy.get('wingId')?.value);
      formData.append('categoryId', this.policy.get('categoryId')?.value);
      formData.append('policyFile', this.policy.get('policyFile')?.value);
      formData.append('remarks', this.policy.get('remarks')?.value);

      // Append the file to FormData
      const fileInput = this.policy.get('policyFile')?.value;
      if (fileInput) {
        formData.append('policyFile', fileInput, fileInput.name); // Append the file
      }
      this.apiService.postWithHeader('policy', formData).subscribe({
        next: (res) => {
          this.toastr.success('Policy submitted successfully', 'Success');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.toastr.error('Error submitting policy', 'Error');
        }
      });
    }
  }
  getWings() {
    this.apiService.getWithHeaders('attribute/wing').subscribe((res) => {
      if (res) {
        this.wingList = res;
      }
    });
  }
  getCategory(wingId) {
    this.apiService
      .getWithHeaders('attribute/category' + wingId)
      .subscribe((res) => {
        if (res) {
          this.categoryList = res;
        }
      });
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
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (allowedTypes.includes(file.type)) {
        this.fileName = file.name;
        this.fileSizeFormatted = this.getReadableFileSize(file.size);
        this.policy.patchValue({
          policyFile: file,
        });
      } else {
        this.fileName = null;
        this.fileSizeFormatted = null;
        alert(
          'Invalid file type! Only PDF, Word, and Excel files are allowed.'
        );
      }
    }
  }

  close() {
    this.dailogRef.close(true);
  }
  reset() {
    this.createForm();
  }
}
