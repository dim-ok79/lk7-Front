import {
  Component,
  inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Injectable
} from '@angular/core';
import {from} from "rxjs";
import {groupBy, mergeMap, toArray} from "rxjs/operators";

import  moment from "moment";
import 'moment/locale/ru';
import {CommonModule, NgClass} from "@angular/common";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {
  NgbCalendar,
  NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbInputDatepicker, NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { Ioption } from '../../../../interfaces/frame2/select.interface';
import { IDoc, Ilpu } from '../../../../interfaces/frame2/lpu.interface';
import { IRnumb, IRnumbToDateArray } from '../../../../interfaces/frame2/rnumb.interface';
import { LpuService } from '../../../../services/lpu.service';
import { ConfigService } from '../../../../services/application/config.service';
import { getNameDayMobail, getTime, strToDateNotTime, getNameDay, strToDate } from '../../../../utils/dateFormat';
import { TalonComponent } from '../../../../modals/talon/talon.component';

const I18N_VALUES = {
  'ru': {
    weekdays: ['пн','вт','ср','чт','пт','сб','вс'], // Дни недели
    months: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],  // месяцы
  }
};

@Injectable()
export class I18n {
  language = 'ru';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getMonthShortName(month: number): string {
    // @ts-ignore
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    // @ts-ignore
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  getWeekdayLabel(weekday: number): string{
    // @ts-ignore
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
}


@Component({
  selector: 'app-rnumb',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatSelectModule, FormsModule, NgClass,
    NgbInputDatepicker,NgbDatepickerModule, NgbInputDatepicker
  ],
  templateUrl: './rnumb.component.html',
  styleUrl: './rnumb.component.scss',
  providers: [
    I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}
  ]
})
export class RnumbComponent implements OnInit {
  @Input() cityName: string | null = null;
  @Input() specid: number = 0;
  @Input() doctor: IDoc | null = null;
  @Input() rectype: number = 0; // Тип услуги - 0 по ОМС, 1- платная, 2- trueconf
  @Input() lpuList_rnumb: Ilpu[] = [];
  @Output() CurrentLpu = new EventEmitter<Ioption>();

  @Input()
  set paytype(value: number | null) {
      this.tmp_paytype = value;
//      console.log('SET tmp_paytype=', value);
    // @ts-ignore
      if (this.tmp_paytype >= 0){
        // Применяем фильтр
        this.setFilter();
      }
    }

    get paytype(): number | null{
      return this.tmp_paytype;
    }
    private  tmp_paytype  : number | null = null;

  lpulistCurent: Ilpu[] = [];

  selectCurrentLpu: Ilpu | null = null;

  @Input() rnumbList: IRnumb[] = [];

  private tmp_rnumbList: IRnumb[]  = [];
  public rnumbToDateArray: IRnumbToDateArray[] = [];
  public tmp_rnumbToDateArray: IRnumbToDateArray[] = [];
  public rnumbListToDate : IRnumb[] = [];
  public isMobile = false;
  private lpuS = inject(LpuService);
  private modalService = inject(NgbModal);

  modelSelectDate: NgbDateStruct = {year: 2026, month: 6, day:10};

  constructor(
              private configS: ConfigService,
              public dialog: MatDialog,
              private calendar: NgbCalendar,
  ) {

  }

  ngOnInit(): void {

    moment.locale('ru');
//    this.loadingRnumbList = true;
    if (window.innerWidth < 600) {
      this.isMobile = true;
    }
    this.setRnumbList(this.rnumbList);

  }

/* *************/

  isDayAction(date: NgbDate): boolean {
    let dtSearh = '';
    if (date.day>9){
      dtSearh = dtSearh + '' + date.day;
    } else {
      dtSearh = dtSearh + '0' + date.day;
    }
    if (date.month>9){
      dtSearh = dtSearh + '.' + date.month;
    } else {
      dtSearh = dtSearh + '.0' + date.month;
    }
    dtSearh = dtSearh + '.' + date.year;
    const result = this.tmp_rnumbList.filter(item => item.dat_begin_str.includes(dtSearh));
    return result.length>0;
  }

  onDateSelected(event: any) {
/*
    console.log('onDateSelected дата:', event.value);
    console.log('onDateSelected modelSelectDate:', this.modelSelectDate);
    console.log('onDateSelected this.rnumbToDateArray :', this.rnumbToDateArray );
*/
    this.setFilter(this.modelSelectDate);

/*
    const tmpDt = new Date(this.modelSelectDate.year, this.modelSelectDate.month - 1, this.modelSelectDate.day)
console.log('tmpDt=', tmpDt);
    const tmpRec = this.rnumbToDateArray.filter(item =>
      moment(item.dt).format('DD.MM.YYYY') ==  moment(tmpDt).format('DD.MM.YYYY')
     );
    console.log('tmpRec=', tmpRec);
    if (tmpRec && tmpRec.length>0){
      this.setFilter(tmpRec[0]);
//      this.onSelectDay(tmpRec[0])
    }
*/

  }

/* *************/

  setRnumbList(value: IRnumb[]) {
    this.tmp_rnumbList = value;
//    console.log('SET rnumbList=', this.tmp_rnumbList);
    this.tmp_rnumbList.forEach(item => {
      item.dat = strToDateNotTime(item.dat_begin_str);
    })
// Группируем по дате
    const source = from(this.tmp_rnumbList);
    // @ts-ignore
    const temp = source.pipe(
      groupBy(resspec => moment(resspec.dat).format('DD.MM.YYYY')),
      mergeMap(group => group.pipe(toArray()))
    );

    let tempLpu: number[] = [];
    this.tmp_rnumbList.forEach(item => {
      if (!tempLpu.includes(item.lpu_id)) {
        tempLpu.push(item.lpu_id)
      }
    });

    tempLpu.forEach(item => {
      const tmp = this.lpuList_rnumb.filter(itemLpu => itemLpu.id == item)
      if (tmp && tmp.length>0){
        this.lpulistCurent.push(tmp[0]);
        this.lpuS.LpuAdd(tmp[0]);
        this.CurrentLpu.emit({text: tmp[0].name, valueNum: Number(tmp[0].id), infoStr: tmp[0].addres});
      }
    })

//     this.lpuS.LpuAdd(this.lpulistCurent[0]);
    this.selectCurrentLpu = this.lpulistCurent[0];

    temp.subscribe(val => {
      // @ts-ignore
      this.tmp_rnumbToDateArray.push({dt: val[0].dat, rnumbInfo: val, active: false})
      this.setFilter();
    });
  }

 setFilter(setDt?: NgbDateStruct){
   let p_paytype = 0;
   if (this.tmp_paytype && this.tmp_paytype > 0){
     p_paytype = this.tmp_paytype;
   }
/*   console.log('setFilter p_paytype=', p_paytype);*/
   this.rnumbToDateArray = [];
//   console.log('111 setFilter this.tmp_rnumbToDateArray=', this.tmp_rnumbToDateArray);
/*   console.log('000 setFilter this.tmp_rnumbToDateArray=', structuredClone(this.tmp_rnumbToDateArray));*/
   this.rnumbToDateArray = structuredClone(this.tmp_rnumbToDateArray);
/*   console.log('111 setFilter this.rnumbToDateArray=', structuredClone(this.rnumbToDateArray));*/
   this.rnumbToDateArray.forEach(item => {
// Тип услуги - 0 по ОМС, 1- платная, 2- trueconf
     switch (p_paytype) {
       case 0: { // по ОМС
         item.rnumbInfo = item.rnumbInfo.filter( itemr => itemr.is_online_pay == 0)
         break;
       }
       case 1: { // Платная
         item.rnumbInfo = item.rnumbInfo.filter( itemr => itemr.is_online_pay == 1 && itemr.is_telemed == 0)
         break;
       }
       case 2: { // TrueConf
         item.rnumbInfo = item.rnumbInfo.filter( itemr => itemr.is_online_pay == 1 && itemr.is_telemed == 1)
         break;
       }
     }

   })

   this.rnumbToDateArray = this.rnumbToDateArray.filter(item => item.rnumbInfo.length>0);

/*
  console.log('333 setFilter this.doctor=', this.doctor);
  console.log('333 setFilter this.rnumbToDateArray=', this.rnumbToDateArray);
*/

// проверка на входящую дату
   if (setDt){
     const tmpDt = new Date(this.modelSelectDate.year, this.modelSelectDate.month - 1, this.modelSelectDate.day)

     const index = this.rnumbToDateArray.findIndex(day =>
       moment(day.dt).format('DD.MM.YYYY') == moment(tmpDt).format('DD.MM.YYYY')
     );
     if (index+1 > 0) {
//       this.rnumbToDateArray = this.rnumbToDateArray.slice(index-1, 2); // Обрезаем до 3 дней - Кол дней
//       this.rnumbToDateArray = this.rnumbToDateArray.slice(1, 4); // Обрезаем до 3 дней - Кол дней
       const tmpsetDt = this.rnumbToDateArray[index];
       // Проверка на 0 элемент
       if (index == 0 ){
         this.rnumbToDateArray = this.rnumbToDateArray.slice(0, 3); // Обрезаем до 3 дней - Кол дней
       } else {
         // Проверка на последний элемент
         if (!this.rnumbToDateArray[index+1] ){
           this.rnumbToDateArray = this.rnumbToDateArray.slice(index-2, index+2); // Обрезаем до 3 дней - Кол дней
         } else {
           this.rnumbToDateArray = this.rnumbToDateArray.slice(index-1, index+2); // Обрезаем до 3 дней - Кол дней
         }

       }

       this.onSelectDay(tmpsetDt);
     }
   } else {
     // Только 3 записи
     this.rnumbToDateArray.splice(3); // Обрезаем до 3 дней - Кол дней

     if (this.rnumbToDateArray.length > 0) {
       this.onSelectDay(this.rnumbToDateArray[0]);
     } else {
       this.rnumbListToDate = [];
     }
   }


 }

  p_getTime(dt: Date | undefined): string{
    return getTime(dt);
  }

  p_getNameDay(dt: Date): string{
    if (this.isMobile){
      return getNameDayMobail(dt);
    } else {
      return getNameDay(dt);
    }
  }

  getDate(dt: Date): string{
    return moment(dt).format('D MMM');
  }

  onSelectDay(d : IRnumbToDateArray) {
    this.rnumbToDateArray.forEach(item => {
      item.active = moment(item.dt).format('DD.MM.YYYY') == moment(d.dt).format('DD.MM.YYYY');
    })
    this.rnumbListToDate = d.rnumbInfo;
    this.rnumbListToDate.forEach(item => {item.dat = strToDate(item.dat_begin_str)})
//    console.log('onSelectDay d=', d.dt);
    const tmpDate = {day: d.dt.getDate(), month: d.dt.getMonth()+1, year: d.dt.getFullYear()};

    if (this.modelSelectDate !== tmpDate){
      this.modelSelectDate = tmpDate;
    }
  }

  get getPrice(): number {
    if (this.doctor && this.doctor.srvlist && this.doctor.srvlist.length>0 && this.paytype){
      const doc = this.doctor.srvlist.filter(item => item.is_online_pay == 1)[0];
      return doc.price;
    } else {
      return 0;
    }
  }
  get getSrvName(): string {
    if (this.doctor && this.doctor.srvlist && this.doctor.srvlist.length>0 && this.paytype){
      const doc = this.doctor.srvlist.filter(item => item.is_online_pay == 1)[0];
      return doc.text;
    } else {
      return '';
    }
  }

  openDialog(rnum: IRnumb): void {
    console.log('Open r=', rnum);
    console.log('Open doctor=', this.doctor);
//    console.log('open rnumb=', rnumb);
    const modalRef = this.modalService.open(TalonComponent, {
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.srvlist.set(this.doctor?.srvlist);
    modalRef.componentInstance.rnumbID = rnum.rnumbid;
    modalRef.componentInstance.typeTalon = 1; // Запись

    modalRef.result.then(
      (result) => {
        // Действие при закрытии (close)
        console.log(`Закрыто с результатом:`, result);
      },
      (reason) => {
        // Действие при отмене/закрытии крестиком (dismiss)
        console.log(`Отклонено по причине: `, reason);
      }
    );

  }

/*
  openDialog(rnum: IRnumb): void {
//    console.log('this.doctor=', this.doctor);
    const vdata : Italoninfo = {
                                docid: this.doctor?.doctorid ?? 1,
                                docname: `${this.doctor?.l_name} ${this.doctor?.s_name} ${this.doctor?.f_name}`,
                                docNote: this.doctor?.dolgnost,
                                cityname: this.cityName ?? '',
                                lpuname: '',
                                lpuAdr:  this.selectCurrentLpu?.addres ?? '',
                                srvName: this.getSrvName,
                                srvPrice: this.getPrice,
                                dt: strToDate(rnum.dat_begin_str)
                              }
    const dialogRef = this.dialog.open(ModalTaloninfoComponent, {
      width: '700px',
      data: vdata
    });

    dialogRef.afterClosed().subscribe(result => {
// console.log('dialog res=', result);
      if (result && result == true){
        this.GoToLK(rnum);
      }
      /!*      console.log('The dialog was closed');*!/
//      this.SelectedTypeSrv = null;
    });
  }
*/

  GoToLK(rnum: IRnumb){
    let url = this.configS.getValue('hostLK');
//      ?lpuid=3&docid=111&specid=344&rnumb=3456&servid=3322&rectype=0&paytype=1
    // @ts-ignore
    url = url + `?lpuid=${this.selectCurrentLpu.id}&docid=${this.doctor.doctorid}&specid=${this.specid}&rnumb=${rnum.rnumbid}&servid=3322&rectype=${this.rectype}&paytype=${rnum.is_online_pay}`
    console.log('url=', url);
    window.open(url, '_blank');
  }

  onSelectedLpu(ev: any){
    console.log('SELECT this.selectCurrentLpu=', this.selectCurrentLpu);
//    this.selectCurrentLpu = ev;
  }
}
