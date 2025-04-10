import { Component } from '@angular/core';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';
import { ZipperTableComponent } from 'projects/shared/src/component/zipper-table/zipper-table.component';
import { Policy, PolicyFilterModel } from 'projects/shared/src/models/policy&misc.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { AuthService } from 'projects/shared/src/service/auth.service';
import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { EpContractAddComponent } from '../ep-contract-add/ep-contract-add.component';

@Component({
  selector: 'app-ep-contract-list',
  standalone: true,
  imports: [SharedLibraryModule,ZipperTableComponent],
  templateUrl: './ep-contract-list.component.html',
  styleUrl: './ep-contract-list.component.scss'
})
export class EpContractListComponent extends TablePaginationSettingsConfig{
  epContractList:Policy[]=[];
  filterModel:PolicyFilterModel=new PolicyFilterModel();
  isRefresh:boolean=false;
  constructor(private apiService:ApiService,private authService:AuthService,private dailogService:BISMatDialogService){
    super()
    this.tablePaginationSettings.enableAction = true;
    this.tablePaginationSettings.enableEdit = true;
    this.tablePaginationSettings.enableDelete = true;
    this.tablePaginationSettings.pageSizeOptions = [50, 100];
    this.tablePaginationSettings.showFirstLastButtons = false;
    this.filterModel.wingId = parseInt(this.authService.getWingId())
    this.filterModel.type = 'Ep Contract'
    this.getAllContract()
  }

  getAllContract(){
    this.apiService.postWithHeader('policy/type',this.filterModel).subscribe(res =>{
      if(res){
        this.epContractList = res;
      }
    })
  }
  openDailog(){
    this.dailogService.open(EpContractAddComponent,null)
  }
  getFileId(row){

  }
  edit(row){

  }
  columns = [
    {
      name: 'fileName', displayName: 'File Name', isSearchable: true,hide: false,valueType:'link',valuePrepareFunction:(row) =>{
        return row.fileName
      }
    },
    {
      name: 'category', displayName: 'Category', isSearchable: true,hide: false,type:'text'
    },
    {
      name: 'remarks', displayName: 'Remarks', isSearchable: true,hide: false,type:'text'
    }
  ]
}
