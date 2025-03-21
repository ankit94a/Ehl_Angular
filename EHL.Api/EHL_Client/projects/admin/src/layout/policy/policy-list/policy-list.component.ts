import { Category, Eqpt, SubCategory, Wing } from 'projects/shared/src/models/attribute.model';
import { PolicyAddComponent } from './../policy-add/policy-add.component';
import { Component } from '@angular/core';
import { FilterModel, Policy, PolicyFilterModel, } from 'projects/shared/src/models/policy&misc.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';
import { ZipperTableComponent } from 'projects/shared/src/component/zipper-table/zipper-table.component';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [SharedLibraryModule,ZipperTableComponent],
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.scss'
})
export class PolicyListComponent extends TablePaginationSettingsConfig{
  policyList:Policy[]=[];
  categoryList:Category[]=[];
  wingList:Wing[]=[];
  filterModel:PolicyFilterModel = new PolicyFilterModel();
  isRefresh:boolean=false;
  constructor(private dialogService:BISMatDialogService,private apiService:ApiService){
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
  getFileId($event){

  }
  view(row){

  }
  edit(row){

  }
  openDailog(){
    this.dialogService.open(PolicyAddComponent,null,'50vw').then(res =>{
      if(res){
        // this.getAll
      }
    })
  }
  getPolicyByWing(){
    this.apiService.getWithHeaders('policy/wing/'+this.filterModel.wingId).subscribe(res =>{
      if(res){
        this.policyList=res;
      }
    })
  }
  getWings(){
    this.apiService.getWithHeaders('attribute/wing').subscribe(res =>{
      if(res){
        this.wingList=res;
        this.filterModel.wingId = this.wingList[0].id;
        this.getPolicyByWing()
      }
    })
  }
  getCategory(wingId){
    this.apiService.getWithHeaders('attribute/category'+wingId).subscribe(res =>{
      if(res){
        this.categoryList=res;
      }
    })
  }
  getReadableFileSize(size: number): string {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  }
  columns = [
    {
      name: 'fileName', displayName: 'File', isSearchable: false,hide: false,valueType:'link',valuePrepareFunction:(row) =>{
        return row.fileName + " | Size =  " +this.getReadableFileSize(row.fileSize)
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
