import { Component, inject, Input, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RnumbComponent} from "../rnumb/rnumb.component";
import {LoadingComponent} from "../loading/loading.component";
import { BtnComponent } from '../../../common/btn/btn.component';
import { ImgService } from '../../../../services/img.service';
import { Ioption } from '../../../../interfaces/frame2/select.interface';
import { IRnumb } from '../../../../interfaces/frame2/rnumb.interface';
import { IDoc, Ilpu } from '../../../../interfaces/frame2/lpu.interface';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, BtnComponent, RnumbComponent, LoadingComponent],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
  providers: []
})
export class DoctorComponent implements OnInit {
  @Input() doctor: IDoc | null = null;
  @Input() SpecId: number = -1;
  @Input() Spec: Ioption | null = null;
  @Input() paytype: number | null = null; // Тип услуги - 0 по ОМС, 1- платная, 2- trueconf
  @Input() lpuList_doc: Ilpu[] = [];

  @Input() rnumb_list: IRnumb[] = [];
  @Input() docUrl: string | null = null;
  @Input() urlDisable: boolean = true;
  @Input() loadingRnumbList = false;
  @Input()   // выбранный ЛПУ из фильтра
  set SetCurrentLpuIsDoctors(value: Ioption | null){

/*
    console.log('1) this.doctor.l_name =', this.doctor!.l_name);
    console.log('2) set SetCurrentLpuIsDoctors value =', value);
    console.log('3) currentLpu =', Object.assign({}, this.currentLpu));
*/

    this.isShow = true;
    if (value && value.valueNum>0 && this.currentLpu && this.currentLpu.valueNum != value.valueNum){
      this.isShow = false;
    }
  }

  isShow: boolean = true; // Показывать данного доктора
  currentLpu: Ioption | null = null; // выбранный ЛПУ из фильтра

  protected imgS = inject(ImgService);

  constructor(
  ){
  }

  ngOnInit(): void {
  }


/* Цена платной услуги */
  get getPrice(): number {
// @ts-ignore
    if (this.doctor && this.doctor.srvlist && this.doctor.srvlist.length>0 && this.paytype>0){
      if (this.paytype == 2){ // Для TrueConf
        const doc = this.doctor.srvlist.filter(item => item.is_online_pay == 1 && item.is_telemed == 1);
        if (doc && doc.length>0 && doc[0].price) {
          return doc[0].price;
        }
      } else {
        const doc = this.doctor.srvlist.filter(item => item.is_online_pay == 1);
        if (doc && doc.length>0 && doc[0].price) {
          return doc[0].price;
        }
      }
      return 0;
    } else {
      return 0;
    }
  }

  goToDoctorInfo(){
    if (this.docUrl){
      window.open(this.docUrl, '_blank');
    }
  }

  public SetCurrentLpu($event: any){
    this.currentLpu = $event;
  }
}
