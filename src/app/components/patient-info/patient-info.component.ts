import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { IPatient } from '../../interfaces/patient.interface';

@Component({
  selector: 'app-patient-info',
  imports: [],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss',
  providers: [PatientService],
  encapsulation: ViewEncapsulation.None

})
export class PatientInfoComponent implements OnInit{

  public patient = signal<IPatient | null>( null); //Текущий пациент

  constructor(
    private ps: PatientService,
  )
  {
  }

  ngOnInit(): void {
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
          this.patient.set(null);
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

  getNum(pat: IPatient | null): string{
    let res = '';
    if (pat){
      res = pat.num;
    }
    return res;
  }

  getAge(pat: IPatient | null): string{
    let res = '';
    if (pat){
      res = pat.age;
    }
    return res;
  }

}
