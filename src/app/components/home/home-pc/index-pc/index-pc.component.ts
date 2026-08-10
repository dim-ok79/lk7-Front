import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BlockGoyComponent } from '../../../common/block-goy/block-goy.component';
import { PatientInfoComponent } from '../../../account/patient-info/patient-info.component';
import { RecmyMinComponent } from '../../../recmy/recmy-min/recmy-min.component';

@Component({
  selector: 'app-index-pc',
  imports: [PatientInfoComponent, BlockGoyComponent, RecmyMinComponent],
  templateUrl: './index-pc.component.html',
  styleUrl: './index-pc.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class IndexPcComponent {
/*  @ViewChild('ContentBlockInfo') ContentBlockInfoEL: ElementRef|undefined;*/

}
