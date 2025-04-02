import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Wing } from 'projects/shared/src/models/attribute.model';
import { ApiService } from 'projects/shared/src/service/api.service';
import { AuthService } from 'projects/shared/src/service/auth.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';

@Component({
  selector: 'app-wing-list',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './wing-list.component.html',
  styleUrl: './wing-list.component.scss'
})
export class WingListComponent {
  wingList:Wing[]=[];
  constructor(private apiService:ApiService,private authService:AuthService,private router: Router){
    this.getWingList();
  }

  getWingList(){
    this.apiService.getWithHeaders('attribute/wing').subscribe(res =>{
      if(res){
        this.wingList = res;
        this.wingList[0].imageUrl = 'automative_eng_wing.png';
        this.wingList[1].imageUrl = 'militaryarya.png';
        this.wingList[2].imageUrl = 'machinery.avif';
        this.wingList[3].imageUrl = 'helicopter-bg.png';
        this.wingList[4].imageUrl = 'misc.avif';
        console.log(this.wingList)
      }
    })
  }
  splitWings(): { firstRow: any[], secondRow: any[] } {
    return {
      firstRow: this.wingList.slice(0, 3),
      secondRow: this.wingList.slice(3, 5)
    };
  }
  setWingData(wing){
    this.authService.setWingDetails(wing);
    this.router.navigate(['/dashboard']);
  }
}
