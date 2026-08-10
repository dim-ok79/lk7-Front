import { Component, signal, OnInit, ViewEncapsulation } from '@angular/core';
import { IPayment, IPaySystem, IServicePayment } from '../../../interfaces/payments.interface';
import { CommonModule } from '@angular/common';
import { PanelTablePaginationComponent } from '../../common/panel-table-pagination/panel-table-pagination.component';
import { MatIconModule} from '@angular/material/icon';
import { getTekDay, getNameDay, getTime, getStrEnd, strToDate, dateMinusDay } from '../../../utils/global.function';
import { IPeriod } from '../../../interfaces/period.interface';
import moment from 'moment';
import { PriceSpacePipe } from '../../../directives/priceSpace.pipe';
import { PaymentsService } from '../../../services/payments.service';
import { RecordService } from '../../../services/record.service';
import { NgbdToastGlobal } from '../../../utils/toast/toast-global.component';
import { IPatient } from '../../../interfaces/patient.interface';
import { PatientService } from '../../../services/patient.service';
import { BtnComponent } from '../../common/btn/btn.component';

@Component({
  selector: 'app-payments-pc',
  imports: [CommonModule, PanelTablePaginationComponent, MatIconModule, PriceSpacePipe, BtnComponent],
  templateUrl: './payments-pc.component.html',
  styleUrl: './payments-pc.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class PaymentsPcComponent implements OnInit{
  private patientDef = {patientId: 0, num: '', lastname: '', firstname: '', secondname: '', birthdatestr: '', birthdate: null, phone: '', cellular: '', email: '',
    address_proj: '', address_proj_f: '', snils: '', count_login: 0, sex: 0, age: ''};
  public patient = signal<IPatient>( this.patientDef); //Текущий пациент

  dtBegin: Date | null = null;    // Дата начала
  dtEnd: Date | null = null;    // Дата ококнчания
  periodText = '';
  loading = signal(false);

  paymentsList = signal<IPayment[]>([]);      // Платежи пациента
  paymentsListCountRectoPage = 10;     // Количетсво записей на странице
  paymentsListCountRec = signal(0);            // Всего записей
  paymentsListHeightBlock = signal(100);

  paySystem: IPaySystem | null = null; // Тип платежной системы
//  paySystemField: string = '';

  constructor(private paymentsS:PaymentsService,
              private rs: RecordService,
              private alert: NgbdToastGlobal,
              private ps: PatientService,
              ){}

  ngOnInit(): void {
    this.getPatient();
    this.getPaySystem();
    this.dtEnd = dateMinusDay(new Date(), 0);
    this.dtBegin = dateMinusDay(this.dtEnd, 20);

    this.changePeriod({begin: this.dtBegin, end: this.dtEnd});
    this.setPeriodText();
  }


  getPatient(){
    this.ps.getServerPatientInfo$()
      .subscribe(
        info => {
          this.patient.set(info);
        }, err => {
          console.error('ERR=', err);
          this.patient.set(this.patientDef);
        }
      );
  }

  // Получение периода текстом
  setPeriodText(){
    let strBegin = '';
    let strEnd = '';
    if (this.dtBegin) {
      strBegin = moment(new Date(this.dtBegin)).format('D MMM YYYY');
    }
    if (this.dtEnd) {
      strEnd = moment(new Date(this.dtEnd)).format('D MMM YYYY');
    }

    if (strBegin && strEnd){
      this.periodText = `${strBegin} - ${strEnd}`;
    } else if(strBegin){
      this.periodText = strBegin
    } else if(strEnd){
      this.periodText = strEnd
    }else{
      this.periodText = 'Последние услуги'
    }
  }

  /* выбор даты */
  changePeriod(dt: IPeriod) {
    this.dtBegin = dt.begin;
    this.dtEnd = dt.end;
    this.getPaymentsSize();
    this.getPayments(1, this.paymentsListCountRectoPage);
  }


  /* Событие выбора страницы */
  changedPage(page: any) {
    if (page == 1) {
      this.getPayments(1, this.paymentsListCountRectoPage);
    } else {
      this.getPayments(page*this.paymentsListCountRectoPage-this.paymentsListCountRectoPage , page*this.paymentsListCountRectoPage)
    }
  }

  /* Получить тип платежной системы телефон почта !*/
  private getPaySystem() {
    this.paySystem = null;
//    this.paySystemField ='';

    this.paymentsS.getPaySystem()
      .subscribe( info => {
          if (info.paySystems && info.paySystems.length>0){
            this.paySystem = info.paySystems[0];
/*
            this.paySystemField = this.paySystem.requiredFieldCodes[0];
            switch (this.paySystemField) {
              case 'phone': {
                this.mdBalansPay.email = null;
                this.mdAbonPay.email = null;
                break;
              }
              case 'email': {
                this.mdBalansPay.phone = null;
                this.mdAbonPay.phone = null;
                break;
              }
            }
*/
          }

        },
        err => {
          console.error('getPaySystem ERR=', err);
        }
      )

  }

  /* Возможна оплата ?*/
  isPay(pay: IPayment): boolean{
//    return (pay.paystatus == 0 && this.paySystem != null);
    return true;
  }

  /* Оплатить*/
  toPay(pay: IPayment) {
    if (this.isPay(pay)) {
// console.log('pay=', pay);
      if (pay.confirmation_url && pay.confirmation_url.length > 5) {
        window.open(pay.confirmation_url);
      } else {
        this.loading.update(val => true)
        this.rs.getPaymentTemp(pay.pt_keyid, this.patient().email, this.patient().phone)
          .subscribe(resPay => {
              if (resPay.identity && resPay.identity > 0) {
                this.paymentsS.getPayOrder(resPay.identity)
                  .subscribe(resOrderPay => {
//                        console.log('getPayOrder RES=', resOrderPay);
                      if (resOrderPay.confirmationurl) {
                        window.open(resOrderPay.confirmationurl);
                      } else {
                        this.alert.danger('Ошибка получения ссылки для оплаты, попробуйте позднее.');
                      }
                      this.loading.update(val => false);
                    },
                    errOrderPay => {
                      this.loading.update(val => false);
                      this.alert.danger('Не получилось создать платеж в платежной системе, попробуйте позднее.');
                      console.error('getPayOrder ERRROr=', errOrderPay);
                    })

              } else {
                if (resPay.err_text && resPay.err_text.length > 2) {
                  this.alert.danger(resPay.err_text)
                } else {
                  this.alert.danger('С платежами чтото пошло не так.')
                }
                this.loading.update(val => false);
              }
            },
            errPay => {
              this.alert.danger('Ошибка создания платежа, попробуйте повторить операцию позднее.');
              this.loading.update(val => false);
              console.error('getPaymentTemp ERRROr=', errPay);
            });
      }
    }
  };


  getPaymentsSize(){
    this.paymentsS.getPaymentsSize(this.dtBegin, this.dtEnd)
      .subscribe( results => {
          if (results.size) {
            this.paymentsListCountRec.update(val => results.size);
          } else {
            this.paymentsListCountRec.update(val => 0);
          }
          this.loading.update(val => false);
        },
        err => {
          console.error('ERRROr=', err);
          this.loading.update(val => false);
        })
  }

  /* Получить список платежей */
  getPayments(pStart?: number , pEnd?: number){
    this.paymentsList.update(val => []);
    this.paymentsS.getPayments(this.dtBegin, this.dtEnd, pStart, pEnd)
      .subscribe( results => {
        this.paymentsList.update(val => results);
/*
          if (results && results.length > 0) {
            this.paymentsList = results;
            this.paymentsList.forEach(item => {
              item.dtSort = strToDate(item.pt_dat_str);
              item.pt_dat = strToDate(item.pt_dat_str);
              item.services.forEach(itemS => {
                if (itemS.dtstr && itemS.dtstr.length > 10){
                  itemS.dt = strToDate(itemS.dtstr);
                }
              });
            });
          }
*/
          this.loading.update(val => false);
        },
        error => {
          console.error('error=', error);
          this.loading.update(val => false);
        });

  }

  getPeriodServicesStartEnd(services: IServicePayment[], isStart = true): string {
    let dt = '';
    moment.locale('ru');
    // Сортировка
    services.sort((a, b) => {
      if (a.dt && b.dt && a.dt > b.dt){
        return 1
      } else {
        return -1
      }
    });
    const len = services.length;

    const i = isStart ? 0 : len-1;
    if (services[0].dt && services[len-1].dt){
      // @ts-ignore
      if (services[0].dt.getFullYear() == services[len-1].dt.getFullYear()) {
        dt = moment(services[i].dt).format('D MMM') ;
      } else {
        dt = moment(services[i].dt).format('D MMM YYYY') ;
      }
    } else {
      if (services[i].dt) {
        dt = moment(services[i].dt).format('D MMM YYYY') ;
      }
    }

    return dt;
  }

  getStrEndServ(count: number) : string {
    return getStrEnd(count, 'услуг', ['а', 'и', '']);
  };


  getTekDay(dt: Date): string {
    return getTekDay(dt);
  }

  getNameDay(dt: Date): string {
    return getNameDay(dt);
  }

  getTime(dt: Date): string {
    return getTime(dt);
  }

}
