import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit, signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { DocumentsComponent } from './documents/documents.component';
import { LogoutsListComponent } from './logouts-list/logouts-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [CommonModule,PatientInfoComponent, DocumentsComponent, LogoutsListComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class AccountComponent implements AfterViewInit {
  @ViewChild('ContentBlockLog') ContentBlocklogEL: ElementRef|undefined;
  public varHeightBlock = signal(0);


  constructor(
  ){
  }

  ngAfterViewInit() {
    this.calcTableH();
  };

  /* расчет высоты блока относительно */
  private calcTableH(){
    console.log('0 calcTableH this.ContentBlocklogEL=', this.ContentBlocklogEL?.nativeElement.offsetHeight );
//    this.varHeightBlock = this.ContentBlocklogEL?.nativeElement.offsetHeight;
    this.varHeightBlock.update(curr => curr = this.ContentBlocklogEL?.nativeElement.offsetHeight);
    console.log('0 calcTableH set this.varHeightBlock=', this.varHeightBlock() );

  }

}
