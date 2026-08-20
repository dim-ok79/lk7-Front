import { Component, inject, signal } from '@angular/core';
import { IPatient } from '../../../../interfaces/patient.interface';
import { PatientService } from '../../../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-mobile',
  imports: [],
  templateUrl: './index-mobile.component.html',
  styleUrl: './index-mobile.component.scss',
})
export class IndexMobileComponent {
  private patientDef = {patientId: 0, num: '', lastname: '', firstname: '', secondname: '', birthdatestr: '', birthdate: null, phone: '', cellular: '', email: '',
    address_proj: '', address_proj_f: '', snils: '', count_login: 0, sex: 0, age: ''};
  public patient = signal<IPatient>( this.patientDef); //Текущий пациент

  patientS = inject(PatientService);

  constructor(
  ){
    this.patientS.getServerPatientInfo$()
      .subscribe(
        info => {
          this.patient.set(info);
        }, err => {
//                  this.patient = null;
          this.patient.set(this.patientDef);
        }
      );
  }

}
