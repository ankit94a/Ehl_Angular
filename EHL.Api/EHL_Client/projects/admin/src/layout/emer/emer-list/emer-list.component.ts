import { Component } from '@angular/core';
import { BISMatDialogService } from 'projects/shared/src/service/insync-mat-dialog.service';
import { SharedLibraryModule } from 'projects/shared/src/shared-library.module';
import { EmerAddComponent } from '../emer-add/emer-add.component';

@Component({
  selector: 'app-emer-list',
  standalone: true,
  imports: [SharedLibraryModule],
  templateUrl: './emer-list.component.html',
  styleUrl: './emer-list.component.scss'
})
export class EmerListComponent {

  constructor(private dialoagService:BISMatDialogService){

  }
  openDialog(){
    this.dialoagService.open(EmerAddComponent,null);
  }
}
