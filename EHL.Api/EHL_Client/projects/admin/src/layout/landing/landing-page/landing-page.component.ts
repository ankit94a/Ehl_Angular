import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'projects/shared/src/service/api.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { catchError, map, Observable } from 'rxjs';
import { LoginComponent } from '../../../login/login.component';
import { ActivatedRoute } from '@angular/router';
import { LandingProfile, News } from 'projects/shared/src/models/news.model';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

 news: News;
  newsList: News[] = [];
   userProfile: LandingProfile = new LandingProfile();

  constructor(private apiService:ApiService,private http:HttpClient,private dialogService: BISMatDialogService,private route:ActivatedRoute){


    this.news = new News();
    this.newsList = [];
  }
  ngOnInit() {
    this.getAllNews();
    this.getProfile();
  }
  getAllNews() {
    this.apiService.getWithHeaders('landingpage/news').subscribe(res => {
      if (res) {
        this.newsList = res;
      }
    })
  }
  getProfile(){
    this.apiService.getWithHeaders('landingpage/profile').subscribe(res =>{
      if(res){
        this.userProfile = res;
      }
    })
  }
  openDialog(){
    this.dialogService.open(LoginComponent,null,'25vw','40vh');
  }

}
