import { Component } from '@angular/core';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';
import { ZipperTableComponent } from 'projects/shared/src/component/zipper-table/zipper-table.component';
import { Category, Wing } from 'projects/shared/src/models/attribute.model';
import { DownloadModel } from 'projects/shared/src/models/download.model';
import { Policy } from 'projects/shared/src/models/policy&misc.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { AuthService } from 'projects/shared/src/service/auth.service';
import { DownloadService } from 'projects/shared/src/service/download.service';
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
  categoryList:Category[]=[];
  clonedList:Policy[]=[];
  constructor(private apiService:ApiService,private authService:AuthService,private downloadService:DownloadService){
    super();
    // this.tablePaginationSettings.enableAction = true;
    // this.tablePaginationSettings.enableEdit = true;
    // this.tablePaginationSettings.enableView = true;
    // this.tablePaginationSettings.enableDelete = true;
    this.tablePaginationSettings.enableColumn = true;
    this.tablePaginationSettings.pageSizeOptions = [50, 100];
    this.tablePaginationSettings.showFirstLastButtons = false;
    // this.getWings();
    this.policyType.wingId = parseInt(this.authService.getWingId());
    this.getAll();
    this.getCategory()
  }
  getCategory(){
    this.apiService.getWithHeaders('attribute/category'+this.policyType.wingId).subscribe(res =>{
      if(res){
        this.categoryList=res;
      }
    })
  }
  getAll(){

    this.policyType.type = 'Technical Manuals'
    this.apiService.postWithHeader('policy/type',this.policyType).subscribe(res =>{
      if(res){
        this.manualList = res;
        this.clonedList = res;
        console.log('m',this.manualList)
      }
    })
  }
  filterCategory(categoryId: any) {
    if (categoryId == null) {
      this.manualList = [...this.clonedList];
    } else {
      this.manualList = this.clonedList.filter(item => item.categoryId === categoryId);
    }
  }

  getWings(){
    this.apiService.getWithHeaders('attribute/wing').subscribe(res =>{
      if(res){
        // this.wingList=res;
        // this.policyType.wingId = this.wingList[0].id
        // this.getAll();
      }
    })
  }
  openDailog(){

  }
  edit(row){

  }
  view(row){

  }
   getFileId($event) {
      var download = new DownloadModel();
      download.filePath = $event.filePath;
      download.name = $event.fileName;
      this.downloadService.download(download)
    }
  columns = [
    {
      name: 'fileName', displayName: 'File Name', isSearchable: false,hide: false,valueType:'link',valuePrepareFunction:(row) =>{
        return row.fileName
      }
    },
    {
      name: 'category', displayName: 'Category', isSearchable: false,hide: false,type:'text'
    }
  ]
}
