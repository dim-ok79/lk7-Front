import { Component, Input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { IPatient } from '../../../interfaces/patient.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-info',
  imports: [CommonModule, MatIconModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss',
  providers: [PatientService],
  encapsulation: ViewEncapsulation.None

})
export class PatientInfoComponent implements OnInit{
  @Input() viewFull: boolean = false; // Показывать полностью

//  public patient = signal<IPatient | null>( null); //Текущий пациент
  private patientDef = {patientId: 0, num: '', lastname: '', firstname: '', secondname: '', birthdatestr: '', birthdate: null, phone: '', cellular: '', email: '',
    address_proj: '', address_proj_f: '', snils: '', count_login: 0, sex: 0, age: ''};
  public patient = signal<IPatient>( this.patientDef); //Текущий пациент


  constructor(
    private ps: PatientService,
  )
  {
  }

  ngOnInit(): void {
// console.log('this.viewFull =', this.viewFull);
    this.ps.getServerPatientInfo$()
      .subscribe(
        info => {
          this.patient.set(info);
          /*                  this.patient.update(curr => ({...curr, birthdate : null}));*/

          /*
                            this.patient = info;
                            this.patient.birthdate = null;
          */
        }, err => {
//                  this.patient = null;
          this.patient.set(this.patientDef);
        }
      );

  }

  getSex(pat: IPatient | null): string{
    let res = '';
    if (pat){
      if (pat.sex>0){ res = 'женский'}
      else { res =  'мужской'}
    }
    return res;
  }

  getPatientFIO(pat: IPatient | null): string {
    let res = '';
    if (pat && pat.lastname && pat.firstname){
      res = pat.lastname +' '+ pat.firstname + ' ' + pat.secondname!;
    }
    return res;
  }

}
