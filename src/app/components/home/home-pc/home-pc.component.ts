import { Component, ViewEncapsulation } from '@angular/core';
import { PatientInfoComponent } from '../../patient-info/patient-info.component';
import { NgbdToastGlobal } from '../../../utils/toast/toast-global.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home-pc',
  imports: [PatientInfoComponent],
  templateUrl: './home-pc.component.html',
  styleUrl: './home-pc.component.scss',
  providers: [NgbdToastGlobal],
  encapsulation: ViewEncapsulation.None

})
export class HomePcComponent {

  constructor(
    private alert: NgbdToastGlobal,
    private auth: AuthService,
  ){
  }

  logout(){
    this.auth.logout();
  }

}
