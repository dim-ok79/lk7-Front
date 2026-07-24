import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IMenu } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { AppMenuService } from '../../../services/menu.service';
import { PatientInfoComponent } from '../../account/patient-info/patient-info.component';

@Component({
  selector: 'app-home-mobile',
  imports: [NgbModule, CommonModule, PatientInfoComponent],
  templateUrl: './home-mobile.component.html',
  styleUrl: './home-mobile.component.scss',
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class HomeMobileComponent {
  isMenuCollapsed = true;

  menuList: IMenu[] = []; // Список меню

  constructor(private menuS: AppMenuService
  ){
    this.menuList = this.menuS.getListMenu();
  }

  goToMenu(m: IMenu){
    this.menuS.goToMenu(m);
    this.isMenuCollapsed = true;
  }

}
