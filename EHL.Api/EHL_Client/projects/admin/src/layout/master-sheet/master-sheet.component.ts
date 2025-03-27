import { Component } from '@angular/core';
import { MasterSheetModel } from 'projects/shared/src/models/emer.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-master-sheet',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './master-sheet.component.html',
  styleUrl: './master-sheet.component.scss'
})
export class MasterSheetComponent {
  masterSheetList:MasterSheetModel[]=[];
  constructor(private apiService:ApiService){

  }

  getAll(){
    this.apiService.getWithHeaders('emer/mastersheet').subscribe(res =>{
      if(res){
        this.masterSheetList = res;
      }
    })
  }
}
