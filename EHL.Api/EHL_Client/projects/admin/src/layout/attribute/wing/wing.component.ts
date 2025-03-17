import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Wing } from 'projects/shared/src/models/attribute.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-wing',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './wing.component.html',
  styleUrl: './wing.component.scss'
})
export class WingComponent {
 wing:Wing=new Wing();
  constructor(private apiSerive:ApiService,private toastr:ToastrService,private dailogRef:MatDialogRef<WingComponent>){

  }
  save(){
    this.apiSerive.postWithHeader('attribute/wing',this.wing).subscribe(res =>{
      if(res){
        this.toastr.success("Category added successfully",'success');
        this.dailogRef.close(true);
      }
    })
  }
}
