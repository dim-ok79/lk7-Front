import { Component, inject, Input, OnInit, signal } from '@angular/core';
import {DoctorComponent} from "../doctor/doctor.component";
import {CommonModule} from "@angular/common";
import { IDoc, Ilpu } from '../../../../interfaces/frame2/lpu.interface';
import { Ioption } from '../../../../interfaces/frame2/select.interface';
import { IRnumb } from '../../../../interfaces/frame2/rnumb.interface';
import { LpuService } from '../../../../services/lpu.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, DoctorComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
  providers: []
})
export class DoctorsComponent implements OnInit {
  @Input() doctor: IDoc | null = null;
  @Input() SpecId: number = -1;
  @Input() Spec: Ioption | null = null;
  @Input() lpuList_doctors: Ilpu[] = [];
  @Input() SetCurrentLpu: Ioption | null = null; // выбранный ЛПУ из фильтра


  public rnumb_listPAY = signal<IRnumb[]>([]);
  public rnumb_listNOTPAY = signal<IRnumb[]>([]);
  public rnumb_listTrueConf = signal<IRnumb[]>([]);  // Талоны ТЕЛЕМЕДИЦИНЫ
  public loadingRnumbList = false;
  public docUrl: string | null = null;
  public urlDisable: boolean = true;
  private lpuS = inject(LpuService);

  constructor(
  ){
  }

  ngOnInit(): void {
    this.docUrl = null;
    this.urlDisable = true;

    // @ts-ignore
    this.lpuS.getDocURL$(this.doctor.doctorid)
      .subscribe(
        res => {
          if (res && res[0] && res[0].url && res[0].url.length>5){
            // @ts-ignore
            this.docUrl = res[0].url;
            this.urlDisable = false;
          }
        },
        err => {
          console.error('DocUrl err=', err);
        }
      );

    this.loadingRnumbList = true;
    // @ts-ignore
    this.lpuS.getRnumbList$(this.SpecId, this.doctor?.doctorid, null)
      .subscribe(
        res => {
          this.loadingRnumbList = false;
          // is_online_pay Разделить талоны
          this.rnumb_listPAY.set([]);
          this.rnumb_listNOTPAY.set([]);
          this.rnumb_listTrueConf.set([]);

          res.forEach(item => {
            // Платные талоны
            if (item.is_online_pay && item.is_telemed ==0) {
              this.rnumb_listPAY.update(val => [...val, item]);
            }
            // Талоны по ОМС
            if (item.is_online_pay == 0) {
              this.rnumb_listNOTPAY.update(val => [...val, item]);
            }
            // Талоны на телемед (stacid: 90714825) label_true_conf
            if (item.is_online_pay && item.is_telemed ==1) {
              this.rnumb_listTrueConf.update(val => [...val, item]);
            }
          });


/*
console.log('this.doctor=', this.doctor);
console.log('this.rnumb_listTrueConf=', this.rnumb_listTrueConf());
console.log('this.rnumb_listPAY=', this.rnumb_listPAY());
console.log('this.rnumb_listNOTPAY=', this.rnumb_listNOTPAY());
*/




        },
        err => {
          this.loadingRnumbList = false;
          this.rnumb_listPAY.set([]);
          this.rnumb_listNOTPAY.set([]);
          this.rnumb_listTrueConf.set([]);
          console.error('refreshListSpec err=', err);
        }
      );

  }



}
