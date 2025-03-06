import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { Category, Eqpt, SubCategory } from 'projects/shared/src/models/attribute.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { TablePaginationSettingsConfig } from 'projects/shared/src/component/zipper-table/table-settings.model';
import { ZipperTableComponent } from 'projects/shared/src/component/zipper-table/zipper-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EqptComponent } from './eqpt/eqpt.component';

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [SharedLibraryModule,RouterModule,ZipperTableComponent],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  categoryList:Category[]=[]
  subCategoryList:SubCategory[]=[];
  eqptList:Eqpt[]=[];
  activeTab: string = 'category';
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Category>(this.categoryList);
  dataSource1 = new MatTableDataSource<Category>(this.subCategoryList);
  dataSource2 = new MatTableDataSource<Category>(this.subCategoryList);
  categoryId:number;
  subCategoryId:number;
  constructor(private dialogService:BISMatDialogService,private apiService:ApiService){
    this.getCategory();
  }

  onTabChange(event): void {
    const selectedTab = event.index;
    switch (selectedTab) {
      case 0:
        this.activeTab = 'category';
        this.getCategory();
        break;
      case 1:
        this.activeTab = 'subcategory';
        this.getSubCategory(this.categoryId);
        break;
      case 2:
        this.activeTab = 'emr';
        break;
      default:
        break;
    }
  }
  edit(item){

  }
  view(item){

  }
  getCategory(){
    this.apiService.getWithHeaders('attribute/category').subscribe(res =>{
      if(res){
      this.categoryList=res;
      this.dataSource.data = this.categoryList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.categoryId = this.categoryList[0].id;
      }
    })
  }
  getSubCategory(categoryId){
    this.apiService.getWithHeaders('attribute/subcategory'+categoryId).subscribe(res =>{
      if(res){
        this.subCategoryList=res;
        this.dataSource1.data = this.subCategoryList;
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
      }
    })
  }
  getEqpt(){
    this.apiService.getWithHeaders('attribute/eqpt'+this.categoryId+"/"+this.subCategoryId).subscribe(res =>{
      if(res){
        this.eqptList=res;
        this.dataSource2.data = this.subCategoryList;
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      }
    })
  }
  addCategory(){
    this.dialogService.open(CategoryComponent,null,'30vw').then(res =>{
      if(res){
        this.getCategory();
      }
    });
  }
  addSubCategory(){
    this.dialogService.open(SubCategoryComponent,null,'40vw').then(res =>{
    if(res){
      this.getSubCategory(this.categoryId);
    }
    });
  }
  addEqpt(){
    this.dialogService.open(EqptComponent,null,'40vw').then(res =>{

    });
  }

}
