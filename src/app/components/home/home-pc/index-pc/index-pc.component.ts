import { Component, ViewEncapsulation } from '@angular/core';
import { PatientInfoComponent } from '../../../account/patient-info/patient-info.component';
import { RecmyMinComponent } from '../../../recmy/recmy-min/recmy-min.component';
import { ActionsComponent } from '../../../actions/actions.component';
import { ServiseTopComponent } from '../../../servise-top/servise-top.component';

@Component({
  selector: 'app-index-pc',
  imports: [PatientInfoComponent, RecmyMinComponent, ActionsComponent, ServiseTopComponent],
  templateUrl: './index-pc.component.html',
  styleUrl: './index-pc.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class IndexPcComponent {
/*  @ViewChild('ContentBlockInfo') ContentBlockInfoEL: ElementRef|undefined;*/

}
