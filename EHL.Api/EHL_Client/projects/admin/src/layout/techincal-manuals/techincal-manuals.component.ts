import { Component } from '@angular/core';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';
import { ZipperTableComponent } from 'projects/shared/src/component/zipper-table/zipper-table.component';
import { Wing } from 'projects/shared/src/models/attribute.model';
import { Policy } from 'projects/shared/src/models/policy&misc.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-techincal-manuals',
  standalone: true,
  imports: [SharedLibraryModule,ZipperTableComponent],
  templateUrl: './techincal-manuals.component.html',
  styleUrl: './techincal-manuals.component.scss'
})
export class TechincalManualsComponent extends TablePaginationSettingsConfig{
  manualList:Policy[]=[];
  policyType = new Policy();
  isRefresh:boolean=false;
  wingList:Wing[]=[];
  constructor(private apiService:ApiService){
    super();
    this.tablePaginationSettings.enableAction = true;
    this.tablePaginationSettings.enableEdit = true;
    this.tablePaginationSettings.enableView = true;
    // this.tablePaginationSettings.enableDelete = true;
    this.tablePaginationSettings.enableColumn = true;
    this.tablePaginationSettings.pageSizeOptions = [50, 100];
    this.tablePaginationSettings.showFirstLastButtons = false;
    this.getWings();
  }
  getAll(){

    this.policyType.type = 'Technical Manuals'
    this.apiService.postWithHeader('policy/type',this.policyType).subscribe(res =>{
      if(res){
        this.manualList = res;
      }
    })
  }
  getWings(){
    this.apiService.getWithHeaders('attribute/wing').subscribe(res =>{
      if(res){
        this.wingList=res;
        this.policyType.wingId = this.wingList[0].id
        this.getAll();
      }
    })
  }
  openDailog(){

  }
  edit(row){

  }
  view(row){

  }
  getFileId($event){

  }
  columns = [
    {
      name: 'fileName', displayName: 'File Name', isSearchable: false,hide: false,valueType:'link',valuePrepareFunction:(row) =>{
        return row.fileName
      }
    },
    {
      name: 'wing', displayName: 'Wing', isSearchable: true,hide: false,type:'text'
    },
    {
      name: 'category', displayName: 'Category', isSearchable: true,hide: false,type:'text'
    }
  ]
}
