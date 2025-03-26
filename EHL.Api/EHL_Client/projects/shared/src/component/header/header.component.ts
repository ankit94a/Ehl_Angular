import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedLibraryModule } from '../../shared-library.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { LanguageComponent } from '../language/language.component';
import { UserProfileComponent } from 'projects/admin/src/layout/user-profile/user-profile.component';
import { BISMatDialogService } from '../../service/insync-mat-dialog.service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports:[SharedLibraryModule,RouterModule,LanguageComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private authService:AuthService,private dialogService:BISMatDialogService) { }

  ngOnInit(): void {

  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onLoggedout() {
    this.authService.clear()
  }
  openDialog(){
    this.dialogService.open(UserProfileComponent,null,'75vw','75vh')
  }
}
