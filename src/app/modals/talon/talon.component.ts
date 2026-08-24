import { Component, inject, Input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RnumbService } from '../../services/rnumb.service';
import { CommonModule } from '@angular/common';
import { IResRecord, ITalonInfo } from '../../interfaces/record.interface';
import {getNameDay, strToDate, getTekDay} from "../../utils/global.function";
import { ConfigService } from '../../services/application/config.service';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { BtnComponent } from '../../components/common/btn/btn.component';
import { ImgService } from '../../services/img.service';
import { LpuService } from '../../services/lpu.service';
import { Ilpu, Isrvlist } from '../../interfaces/frame2/lpu.interface';
import { LoadingComponent } from '../../components/frame2/components/loading/loading.component';
import { RecordService } from '../../services/record.service';
import { NgbdToastGlobal } from '../../utils/toast/toast-global.component';

@Component({
  selector: 'app-talon',
  imports: [CommonModule, MatIconModule, BtnComponent, LoadingComponent],
  templateUrl: './talon.component.html',
  styleUrl: './talon.component.scss',
  providers: [NgbdToastGlobal],
  encapsulation: ViewEncapsulation.None

})
export class TalonComponent implements OnInit{
  @Input() rnumbID: number = 0;
  @Input() typeTalon: number = 0;  // 0 - информация, 1- запись
  @Input() srvlist : Isrvlist[] = [];   // Список услуг

  WEB_LK_PAY_LIFETIME = 60;

  activeModal = inject(NgbActiveModal);
  imgS = inject(ImgService);
  recordS = inject(RecordService);
  lpuS = inject(LpuService);
  lpu : Ilpu | null = null;

  paymentid: number = 0;  // Номер платежа
  isResRecord: IResRecord = {recTalon: false, payOnline: false, payClinic: false};  // Есть результат записи
  recToPay: boolean = false;  // Записаться к врачу на "Оплатить"

  loading = signal<boolean>(false);

  private talonDef: ITalonInfo = {
    rnumb_id: 0,
    dat_bgn: '',  // дата и время начала приема;
    dat_end: '',   // дата и время окончания приема
    cab: null, // номер кабинета
    spec: '',    //  специальность врача
    srv_text: null,      // наименование услуги
    doctor_id: 0,
    lastname: '',   //  фамилия врача;
    firstname: '',  // имя врача
    secondname: '', // отчество врача;
    depname: null,       // название филиала
    addr: null,          // адрес филиала;
    phone: null,            //  телефон филиала
    paystatus: null,        // платный талон (0 - бесплатный, 1 - платный)
    calc_sum: null,            // предварительная стоимость приема.
    is_telemed: null,         // Флаг телемед
    url_telemed: null        // Ссылка на теле-конференцию
  }
  talon = signal<ITalonInfo>(this.talonDef);

  constructor(private rnumbS: RnumbService,
              private configS: ConfigService,
              private alert: NgbdToastGlobal,){
    console.log('rnumbID=', this.rnumbID);
  }

  ngOnInit(): void {
    console.log('init rnumbID=', this.rnumbID);
    this.getInfo(this.rnumbID);
/*
    this.recordS.setRnumbBlStatus(this.rnumbID)
      .subscribe(
        res => {
          this.alert.success('Талон успешно заблокирован для вас.');
          console.log('setRnumbBlStatus res=', res)
          this.loading.set(false);
        },
        err => {
          this.alert.danger('Ошибка блокировки талона.');
          console.log('setRnumbBlStatus err=', err)
          this.loading.set(false);
        }
      );
*/

  }

  getInfo(id: number){
    this.loading.set(true);
    this.rnumbS.getRnumbInfo(id)
      .subscribe(res => {
          console.log('talon info=', res);
          res[0].beginDate = strToDate(res[0].dat_bgn);
          res[0].endDate = strToDate(res[0].dat_end);
          if (res[0] && res[0].lpu_id){
            this.lpu = this.lpuS.getLpuFromId(res[0].lpu_id);
          }

          this.talon.update( val => res[0]);
          this.loading.set(false);
//          this.recToPay = true; // TEST
        },
        err => {
//          this.loadingTalonNum ++ ;
          this.loading.set(false);
          console.error('getRnumbInfo ERRROr=', err);
        })
  }

  /* День и время*/
  getTalonDateTime(dt: Date |  undefined ): string{
    if (dt){
      return moment(dt).format('DD MMMM') + ' в ' + moment(dt).format('HH:mm');
    } else {
      return  '';
    }
  }

  /* День недели*/
  getNameDay(dt: Date |  undefined): string {
    if (dt){
      return getNameDay(dt);
    } else {
      return '';
    }
  }

  getFIODoc(talon: ITalonInfo | null): string{
    let s = '';
    if (talon) {
      if (talon.lastname && talon.lastname.length>0){
        s = talon.lastname;
      }
      if (talon.firstname && talon.firstname.length>0){
        s = s + ' ' + talon.firstname[0] + '.';
      }
      if (talon.secondname && talon.secondname.length>0){
        s = s + ' ' + talon.secondname[0] + '.';
      }
    }
    return s;
  }

  recordTalon(){
    console.log('record talon=', this.rnumbID);
//    this.activeModal.close({record: true, rnumbID: this.rnumbID});
      this.loading.set(true);
    // Блочим тало
    this.recordS.setRnumbBlStatus(this.rnumbID)
      .subscribe(
        res => {
          this.alert.success('Талон успешно заблокирован для вас.');
          console.log('setRnumbBlStatus res=', res)
          let srvId = null;
          if (this.srvlist && this.srvlist.length>0){
            srvId = this.srvlist[0].keyid
          }

          // Записываемся на этот талон
          this.recordS.setAppointment(this.rnumbID, srvId)
            .subscribe(res => {
                if (res.err_code == 0){
//                  this.f_appoitment = true;
//              if (this.params && this.params.srv && this.params.srv.keyid && this.params.srv.price > 0) { // С услугой
                  if (srvId) { // С услугой цену проверяет сама процедура 07,02,2023
                    this.recordS.getAttrs(this.rnumbID, srvId)
                      .subscribe(resAttr => {
                          const attrTalonRec = resAttr;
                          if (resAttr.is_online_pay == 0 && resAttr.is_create_pay_order == 0) {
                            this.recToPay = true;
//                            this.page = 'record';
                            this.isResRecord.recTalon = true;
                          } else {
                            if (resAttr.is_create_pay_order == 1) {
                              if (resAttr.is_telemed == 1) {
                                this.recordS.getСreateConference(this.rnumbID)
                                  .subscribe(resCreateTC => {
                                      this.recordS.getCPbyR(this.rnumbID, srvId)
                                        .subscribe(resCPbyR => {
                                            if (resCPbyR.paymentid && resCPbyR.paymentid >0 ) {
                                              this.paymentid = resCPbyR.paymentid;
                                              this.recToPay = true;
                                              this.loading.set(false);
                                              this.alert.success('Вы успешно записанны на талон.');
                                            } else {
                                              this.loading.set(false);
                                            }
                                          },
                                          errCPbyR => {
                                            console.error('getCPbyR ERRROr=', errCPbyR);
                                            this.loading.set(false);
                                            this.alert.danger(errCPbyR);
                                            this.closeModal(false, {rnumbID: this.rnumbID, canselTalon: true});
//                                            this.dialogRef.close({rnumbID: this.rnumbID, canselTalon: true});  // Закрываем и отменяем талон
                                          })

                                    },
                                    errCreateTC => {
                                      this.loading.set(false);
                                      console.error('Create TrueConf ERRROr=', errCreateTC);
                                      this.alert.danger('Ошибка создания видео конференции, попробуйте через 5 минут.');
                                      this.closeModal(false, {rnumbID: this.rnumbID, canselTalon: true});
//                                      this.dialogRef.close({rnumbID: this.rnumbID, canselTalon: true});  // Закрываем и отменяем талон
                                    })
                              } else {
                                this.recordS.getCPbyR(this.rnumbID, srvId)
                                  .subscribe(resCPbyR => {
                                      if (resCPbyR.paymentid) {
                                        this.paymentid = resCPbyR.paymentid;
                                        this.recToPay = true;
                                      }
                                      this.loading.set(false);
                                    },
                                    errCPbyR => {
                                      this.recToPay = true;
                                      this.loading.set(false);
                                      console.error('getCPbyR ERRROr=', errCPbyR);
                                    })
                              }
                            } else {
                              this.recToPay = true;
                              if (resAttr.is_online_pay == 1){
                                this.loading.set(false);
                              }
                              if (resAttr.is_online_pay != 1 && resAttr.is_create_pay_order != 1){ // Успешно записан без оплат с услугой
                                this.loading.set(false);
                              }
                            }

                          }

                        },
                        errAttr => {
                          this.loading.set(false);
                          console.error('getAttrs ERRROr=', errAttr);
                        })

                  } else {  // Без услуг
                    this.loading.set(false);
//                    this.page = 'record';
                    this.isResRecord.recTalon = true;
                  }

                } else {
                  this.loading.set(false);
                  if (res.err_text){
                    this.alert.danger(res.err_text);
                  } else {
                    this.alert.danger('Чтото пошло не так, повторите попытку позже.');
                  }
                }
              },
              err => {
                this.alert.danger('Чтото пошло не так, повторите попытку позже.');
                console.error('setAppointment ERRROr=', err);
              })

//          this.loading.set(false);
        },
        err => {
          this.alert.danger('Ошибка блокировки талона.');
          console.log('setRnumbBlStatus err=', err)
          this.loading.set(false);
        }
      );

/*
      this.paymentid = 0;
      if (this.params) {
        let rnumbID = this.params.rnumbID;
        let srvId: number | null = null;
        if (this.params && this.params.srv && this.params.srv.keyid){
          srvId = this.params.srv.keyid;
          this.payParam.sum = this.params.srv.price;
        }

        this.recordS.setAppointment(rnumbID, srvId)
          .subscribe(res => {
              if (res.err_code == 0){
                this.f_appoitment = true;
//              if (this.params && this.params.srv && this.params.srv.keyid && this.params.srv.price > 0) { // С услугой
                if (this.params && this.params.srv && this.params.srv.keyid) { // С услугой цену проверяет сама процедура 07,02,2023
                  this.recordS.getAttrs(rnumbID, srvId)
                    .subscribe(resAttr => {
                        this.attrTalonRec = resAttr;
                        if (resAttr.is_online_pay == 0 && resAttr.is_create_pay_order == 0) {
//                      this.dialogRef.close(true);  // Закрываем
                          this.recToPay = true;
                          this.page = 'record';
                          this.isResRecord.recTalon = true;
                        } else {
                          if (resAttr.is_create_pay_order == 1) {
                            if (resAttr.is_telemed == 1) {
                              this.recordS.getСreateConference(rnumbID)
                                .subscribe(resCreateTC => {
//                                console.info('Create TrueConf=', resCreateTC);
                                    this.recordS.getCPbyR(rnumbID, srvId)
                                      .subscribe(resCPbyR => {
                                          if (resCPbyR.paymentid && resCPbyR.paymentid >0 ) {
                                            this.paymentid = resCPbyR.paymentid;
                                            this.recToPay = true;
                                            this.loading.set(false);
                                          } else {
                                            this.loading.set(false);
                                          }
                                        },
                                        errCPbyR => {
                                          console.error('getCPbyR ERRROr=', errCPbyR);
                                          this.loading.set(false);
                                          this.alert.danger(errCPbyR);
                                          this.dialogRef.close({rnumbID: rnumbID, canselTalon: true});  // Закрываем и отменяем талон
                                        })

                                  },
                                  errCreateTC => {
                                    this.loading.set(false);
                                    console.error('Create TrueConf ERRROr=', errCreateTC);
//                                this.alertService.error(errCreateTC);
                                    this.alert.danger('Ошибка создания видео конференции, попробуйте через 5 минут.');
                                    this.dialogRef.close({rnumbID: rnumbID, canselTalon: true});  // Закрываем и отменяем талон
                                  })
                            } else {
                              this.recordS.getCPbyR(rnumbID, srvId)
                                .subscribe(resCPbyR => {
                                    if (resCPbyR.paymentid) {
                                      this.paymentid = resCPbyR.paymentid;
                                      this.recToPay = true;
                                    }
                                    this.loading.set(false);
                                  },
                                  errCPbyR => {
                                    this.recToPay = true;
                                    this.loading.set(false);
                                    console.error('getCPbyR ERRROr=', errCPbyR);
                                  })
                            }
                          } else {
                            this.recToPay = true;
                            if (resAttr.is_online_pay == 1){
                              this.loading.set(false);
                            }
                            if (resAttr.is_online_pay != 1 && resAttr.is_create_pay_order != 1){ // Успешно записан без оплат с услугой
                              this.loading.set(false);
                            }
                          }

                        }

                      },
                      errAttr => {
                        this.loading.set(false);
                        console.error('getAttrs ERRROr=', errAttr);
                      })

                } else {  // Без услуг
                  this.loading.set(false);
                  this.page = 'record';
                  this.isResRecord.recTalon = true;
                }

              } else {
                this.loading.set(false);
                if (res.err_text){
                  this.alert.danger(res.err_text);
                } else {
                  this.alert.danger('Чтото пошло не так, повторите попытку позже.');
                }
              }
            },
            err => {
              this.alert.danger('Чтото пошло не так, повторите попытку позже.');
              console.error('setAppointment ERRROr=', err);
            })
      } else {
        this.loading.set(false);
      }
 */

  }

  goToPay(){
    if (this.paymentid == 0) {
      this.loading.set(true);
      let srvId = null;
      if (this.srvlist && this.srvlist.length>0){
        srvId = this.srvlist[0].keyid
      }

      if (srvId && this.paymentid == 0 ){
        this.recordS.getCPbyR(this.rnumbID, srvId)
          .subscribe(resCPbyR => {
              if (resCPbyR.paymentid) {
                this.paymentid = resCPbyR.paymentid;
              } else {
                this.alert.danger('Ошибка при создании платежа, не получили ID.');
              }
              this.loading.set(false);
            },
            errCPbyR => {
              console.error('Ошибка при создании платежа.', errCPbyR);
              this.alert.danger('Ошибка при создании платежа.');
              this.loading.set(false);
            })

      } else {
        this.alert.danger('Нет услуги, нечего оплачивать.');
        this.loading.set(false);
      }
    }
/*    this.page = 'pay';*/
  }

  closeTalon(){
    this.closeModal(true, {record: false, rnumbID: this.rnumbID});
  }

  onCanselRecord(){
    if (this.rnumbID){
      this.loading.set(true);
      this.recordS.getRnumbCancel(this.rnumbID)
        .subscribe(resCansel => {
            if (resCansel && resCansel.err_code === 0){
              this.alert.success('Талон успешно отменен.');
              this.closeModal(true, {record: false, rnumbID: this.rnumbID, canselRes: true}); // Закрываем
//              this.dialogRef.close({rnumbID: this.params?.rnumbID, canselRes: true});
            } else {
              if (resCansel && resCansel.err_text){
                this.alert.danger(resCansel.err_text);
              } else {
                this.alert.danger('Чтото пошло не так, попробуйте позже.');
              }
            }
            this.loading.set(false);
          },
          errCansel => {
            console.error('getRnumbCancel ERRROr=', errCansel);
            this.loading.set(false);
          })
    } else {
      this.alert.danger('Нет номерка.')
    }

  }

  closeModal(success: boolean, res: any){
    if (success){
      this.activeModal.close(res); // Закрываем
    } else {
      console.log('unlockTalon talon=', this.rnumbID);
      this.recordS.getRnumbUnlock(this.rnumbID)
        .subscribe(
          res => {
            this.alert.success('Талон успешно разблокированн.');
            console.log('getRnumbUnlock res=', res)
          },
          err => {
            this.alert.success('Талон НЕ успешно разблокированн.');
            console.log('getRnumbUnlock err=', err)
          }
        );
      this.activeModal.dismiss(res);

    }
  }

}

 /* Пример запуска
     const modalRef = this.modalService.open(TalonComponent, {
      backdrop: 'static',
      keyboard: false
    });
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

Установите backdrop: 'static', чтобы блокировать закрытие по клику вне окна.
Установите keyboard: false, чтобы отключить закрытие кнопкой Esc

 */
