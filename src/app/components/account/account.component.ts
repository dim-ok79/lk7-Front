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
    /*
        if (this.deviceType == this.size.pc){
          if (this.ContentBlockFioAndDocEL && this.ContentBlockFioEL && this.ContentBlockFioAndDocEL.nativeElement && this.ContentBlockFioEL.nativeElement){
            /!*
                  console.log('ContentBlockFioAndDocEL H=', this.ContentBlockFioAndDocEL.nativeElement.offsetHeight);
                  console.log('ContentBlockFioEL H=', this.ContentBlockFioEL.nativeElement.offsetHeight);
                  console.log('ContentBlockFioEL PARENT H=', this.ContentBlockFioEL.nativeElement.offsetParent.offsetHeight);
            *!/
            let h = this.ContentBlockFioAndDocEL.nativeElement.offsetHeight - this.ContentBlockFioEL.nativeElement.offsetHeight;
            /!*
            console.log('calcH=', h);
            *!/
            h = h - 30;
            this.panelDocSetStyle = {'height': `${h}px`};
            /!*
            console.log('calcH this.panelDocSetStyle=', this.panelDocSetStyle);
            *!/
          }
        }
    */
  }


/*
  isShown = signal(false);

  toggle() {
    this.isShown.update((value) => !value);
  }
*/

}
