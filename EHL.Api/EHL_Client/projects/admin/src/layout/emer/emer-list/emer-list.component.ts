import { Component } from '@angular/core';
import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { EmerAddComponent } from '../emer-add/emer-add.component';
import { ApiService } from 'projects/shared/src/service/api.service';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';

@Component({
  selector: 'app-emer-list',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './emer-list.component.html',
  styleUrl: './emer-list.component.scss'
})
export class EmerListComponent extends TablePaginationSettingsConfig{
  emerList;
  constructor(private dialoagService:BISMatDialogService,private apiService:ApiService){
    super();
  }
  getList(){
    this.apiService.getWithHeaders("").subscribe(res =>{
      if(res){
        this.emerList = res;
      }
    })
  }
  openDialog(){
    this.dialoagService.open(EmerAddComponent,null).then(res =>{
      if(res){

      }
    });
  }
}
