import { Component } from '@angular/core';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';
import { ZipperTableComponent } from 'projects/shared/src/component/zipper-table/zipper-table.component';
import { EmerIndex } from 'projects/shared/src/models/emer.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { AuthService } from 'projects/shared/src/service/auth.service';
import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { EmerIndexAddComponent } from '../emer-index-add/emer-index-add.component';

@Component({
  selector: 'app-emer-index',
  standalone: true,
  imports: [SharedLibraryModule,ZipperTableComponent],
  templateUrl: './emer-index.component.html',
  styleUrl: './emer-index.component.scss'
})
export class EmerIndexComponent extends TablePaginationSettingsConfig{
  emerIndexList:EmerIndex[]=[];
  wingId:number;
  isRefresh:boolean=false;
  constructor(private apiService:ApiService,private authService:AuthService,private dialogService:BISMatDialogService){
    super();
    this.tablePaginationSettings.enableAction = true;
    this.tablePaginationSettings.enableEdit = true;
    this.tablePaginationSettings.enableDelete = true;
    this.tablePaginationSettings.enableColumn = true;
    this.tablePaginationSettings.pageSizeOptions = [50, 100];
    this.tablePaginationSettings.showFirstLastButtons = false
    this.wingId = parseInt(this.authService.getWingId())
    this.getAllIndex();
  }
  openDialog(){
    this.dialogService.open(EmerIndexAddComponent,null,'50vw')
  }
  getFileId(row){

  }
  getAllIndex(){
    this.apiService.getWithHeaders("emer/index/"+this.wingId).subscribe(res =>{
      if(res){
        this.emerIndexList = res;
      }
    })
  }
  columns = [
    {
      name: 'fileName', displayName: 'File', isSearchable: true,hide: false,valueType:'link',valuePrepareFunction:(row) =>{
        return row.fileName
      }
    },
    {
      name: 'emerNumber', displayName: 'EmerNumber', isSearchable: true,hide: false,type:'text'
    },
    {
      name: 'category', displayName: 'Category', isSearchable: true,hide: false,type:'text'
    },
    {
      name: 'subject', displayName: 'Subject', isSearchable: true,hide: false,type:'text'
    },

  ]
}
