import { Component } from '@angular/core';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';
import { ZipperTableComponent } from 'projects/shared/src/component/zipper-table/zipper-table.component';
import { Policy, PolicyFilterModel } from 'projects/shared/src/models/policy&misc.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { AuthService } from 'projects/shared/src/service/auth.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-defect-report',
  standalone: true,
  imports: [SharedLibraryModule,ZipperTableComponent],
  templateUrl: './defect-report.component.html',
  styleUrl: './defect-report.component.scss'
})
export class DefectReportComponent extends TablePaginationSettingsConfig{
  defectReports:Policy[]=[];
  filterModel:Policy = new Policy();
  isRefresh:boolean=false;
  userType;
  constructor(private authService:AuthService,private apiService:ApiService){
    super();
    this.userType = this.authService.getRoleType();
    // this.tablePaginationSettings.enableAction = true;
    if(this.userType != '2'){
      this.tablePaginationSettings.enableEdit = true;
      // this.tablePaginationSettings.enableView = true;
      this.tablePaginationSettings.enableDelete = true;
    }
    
    this.tablePaginationSettings.enableColumn = true;
    this.tablePaginationSettings.pageSizeOptions = [50, 100];
    this.tablePaginationSettings.showFirstLastButtons = false;
    this.filterModel.wingId = parseInt(this.authService.getWingId())
    this.filterModel.type = 'Defect Report'
    this.getPolicyByWing();
  }
  openDailog(){

  }
  getFileId(row){

  }
  getPolicyByWing(){
    this.apiService.postWithHeader('policy/type/',this.filterModel).subscribe(res =>{
      if(res){
        this.defectReports=res;
      }
    })
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
