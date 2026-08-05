import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IMenu } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { PatientInfoComponent } from '../../account/patient-info/patient-info.component';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-home-mobile',
  imports: [NgbModule, CommonModule, PatientInfoComponent, MenuComponent],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss',
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class HomeMobileComponent {
  isMenuCollapsed = true;

  constructor(
  ){
  }

}
