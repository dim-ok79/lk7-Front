import { Component, ViewEncapsulation } from '@angular/core';
import { BlockGoyComponent } from '../../../block-goy/block-goy.component';
import { PatientInfoComponent } from '../../../account/patient-info/patient-info.component';

@Component({
  selector: 'app-index-pc',
  imports: [PatientInfoComponent, BlockGoyComponent],
  templateUrl: './index-pc.component.html',
  styleUrl: './index-pc.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class IndexPcComponent {}
