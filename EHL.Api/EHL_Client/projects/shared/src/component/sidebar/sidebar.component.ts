import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedLibraryModule } from '../../shared-library.module';
// import { SharedModule } from 'projects/shared/src/public-api';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports:[SharedLibraryModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public showMenu!: string;
  sideBarMenus:any;
  permissionList:any=[];
  @Output() sidenavClose = new EventEmitter();
  @Output() isloaded = new EventEmitter();
  constructor(private http:HttpClient ) {
    this.http.get<any[]>('/menu.json').subscribe(data => {
      this.sideBarMenus = data;
    });
    // debugger
    // let userrole = this.authService.getRoleType();
    // this.apiService.getWithHeaders('user/menu').subscribe(res =>{
    //   if(res){
    //     this.sideBarMenus = res;
    //     this.isloaded.emit(true)
    //   }
    // })
   }

  ngOnInit() {

  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  addExpandClass(element: any) {

    if (element === this.showMenu) {
        this.showMenu = '0';
    } else {
        this.showMenu = element;
    }
}
}
