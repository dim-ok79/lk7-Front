import { Injectable } from '@angular/core';
import { AppHttpService } from './application/app-http.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {
  IDep,
  IDoctor, IRecTalon,
  IServ,
  ISpec, IStaticFilter, ITalonInfo, ITalonResAppointment, ITalonResAttrs, ITalonResBlStatus,
  ITalonResCansel,
  ITalonResCPbyR,
  ITalonResPaymentTemp
} from '../interfaces/record.interface';
import { dateToText } from '../utils/global.function';
import { map } from 'rxjs/operators';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpApp: AppHttpService, private auth: AuthService) { }

  /**
   * Список специальностей
   * @param parameters
   * beginDate: Date,
   * endDate: Date
   * staticId - id фильтра
   */
  public getSpecList(beginDate: Date
    , endDate: Date
    , lpuId: number | null
    , staticId: number | null
    , rectype: number): Observable<ISpec[]> {
    let url = '/record/spec/list';
    // Для Валдая выборка только за 14 дней
    if (lpuId == 3) {
      endDate = moment(beginDate).add(14, 'days').toDate();
    }
    //

    if (beginDate && endDate) {
      url = url + `?beginDate=${dateToText(beginDate)}&endDate=${dateToText(endDate)}`;
    }
    if (lpuId) {
      url = url + `&lpuId=${lpuId}`;
    }
    if (staticId) {
      url = url + `&stacId=${staticId}`;
    }
    if (rectype || rectype==0) {
      url = url + `&rectype=${rectype}`;
    }

    return this.httpApp.get(url , this.auth.token);
  }


  /**
   * Список докторов
   * @param parameters
   */
  /*
    public getHistoryEvents(pStart?: number , pEnd?: number): Observable<IHistoryEvents[]> {
      let url = '/history/events';
      if (pStart && pEnd) {
        url = url + `?start=${pStart}&end=${pEnd}`;
      }
  */


  public getDocList(pSpecId: number
    , beginDate: Date
    , endDate: Date
    , stacId: number | null
    , lpuId: number | null
    , rectype: number | null): Observable<IDoctor[]> {
    let url = '/record/doc/list';
    // Для Валдая выборка только за 14 дней
    if (lpuId == 3) {
      endDate = moment(beginDate).add(14, 'days').toDate();
    }
    //

    if (pSpecId && beginDate && endDate) {
      url = url + `?specID=${pSpecId}&beginDate=${dateToText(beginDate)}&endDate=${dateToText(endDate)}`;
    }
    if (stacId) {
      url = url + `&stacId=${stacId}`;
    }
    if (lpuId) {
      url = url + `&lpuId=${lpuId}`;
    }
    if (rectype || rectype==0) {
      url = url + `&rectype=${rectype}`;
    }

    if (rectype === 0){ // Запись к врачу
// Подмена названия услуги
      return this.httpApp.get(url, this.auth.token).pipe(
        map((resp:any[]) => {
          if (resp && resp.length >0){
            resp.forEach((itemDoc:any) => {
              if (itemDoc) {
                itemDoc.srvlist!.forEach((itemSrv:IServ) => {
                  if (itemSrv.is_online_pay === 1){
                    itemSrv.text_orig = itemSrv.text;
                    itemSrv.text = 'Платный прием';
                  }
                })
                itemDoc.srvlist = itemDoc.srvlist!.filter( (itemSS:IServ) => itemSS.is_telemed != 1)
              }
            });
          }
          resp = resp.filter(doc => doc.srvlist.length>0)
          return resp;
        })
      );

    } else {
      if (rectype === 1) { // список услуг по телевидео только оставить
        return this.httpApp.get(url, this.auth.token).pipe(
          map((resp:any[]) => {
            if (resp && resp.length >0){
              resp.forEach((itemDoc:IDoctor) => {
                if (itemDoc) {
                  itemDoc.srvlist = itemDoc.srvlist!.filter( (itemSS:IServ) => itemSS.is_telemed == 1)
                }
              });
            }
            resp = resp.filter(doc => doc.srvlist.length>0)
            return resp;
          })
        );

      } else {
        return this.httpApp.get(url, this.auth.token);
      }
    }

//
    /*
        if (this.RecType == 1) { // список услуг по телевидео
          return doc.srvlist!.filter( item => item.is_telemed == 1)
        } else {
          return doc.srvlist!.filter( item => item.is_telemed != 1)
        }
    */


  }


  public getRnumbList(pDoctorId: number
    , pSpecId: number | null
    , beginDate: Date
    , endDate: Date
    , stacId: number | null
    , srvIds: string | null
    , lpuId: number | null
    , rectype: number | null): Observable<IRecTalon[]> {
    let url = '/record/rnumb/list';
    // Для Валдая выборка только за 14 дней
    if (lpuId == 3) {
      endDate = moment(beginDate).add(14, 'days').toDate();
    }
    //

    if (pDoctorId && pSpecId && beginDate && endDate) {
      url = url + `?specID=${pSpecId}&doctorID=${pDoctorId}&beginDate=${dateToText(beginDate)}&endDate=${dateToText(endDate)}`;
      if (stacId) {
        url = url + `&stacId=${stacId}`;
      }
      if (srvIds) {
        url = url + `&srvIds=${srvIds}`;
      }
      if (lpuId) {
        url = url + `&lpuId=${lpuId.toString()}`;
      }
      if (rectype || rectype==0) {
        url = url + `&rectype=${rectype}`;
      }

    }
    return this.httpApp.get(url, this.auth.token);
  }
  /* Список фильтров кнопок (метки на талонах) */
  public getStacfilterList(): Observable<IStaticFilter[]> {
    let url = '/record/stacfilter/list';
    return this.httpApp.get(url, this.auth.token);
  }

  /* Список подразделений */
  public getDepList(pDoctorId: number, pSpecId: number | null, servId: number | null): Observable<IDep[]> {
    let url = '/record/dep/list';
    if (pDoctorId && pSpecId) {
      url = url + `?doctorID=${pDoctorId}&specID=${pSpecId}`;
    }
    if (servId) {
      url = url + `&servID=${servId}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Информация о талоне */
  public getRnumbInfo(rnumbID: number): Observable<ITalonInfo[]> {
    let url = '/record/rnumb/info';
    if (rnumbID) {
      url = url + `?rnumbID=${rnumbID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Блокировка талона */
  public setRnumbBlStatus(rnumbID: number): Observable<ITalonResBlStatus> {
    let url = '/record/rnumb/blstatus';
    if (rnumbID) {
      url = url + `?rnumbID=${rnumbID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Запись талона */
  public setAppointment(rnumbID: number, srvID: number | null): Observable<ITalonResAppointment> {
    let url = '/record/rnumb/appointment';
    if (rnumbID) {
      url = url + `?rnumbID=${rnumbID}`;
    }
    if (srvID) {
      url = url + `&srvID=${srvID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Проверка статусов талона */
  public getAttrs(rnumbID: number, srvID: number | null): Observable<ITalonResAttrs> {
    let url = '/record/rnumb/attrs';
    url = url + `?rnumbID=${rnumbID}`;

    if (srvID) {
      url = url + `&srvID=${srvID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Создание платежа после записи на номерок */
  public getCPbyR(rnumbID: number, srvID: number | null): Observable<ITalonResCPbyR> {
    let url = '/record/rnumb/cpbyr';
    url = url + `?rnumbID=${rnumbID}`;
    if (srvID) {
      url = url + `&srvID=${srvID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Создание Видео-конференции после записи на номерок */
  public getСreateConference(rnumbID: number): Observable<any> {
    let url = '/trueconf/createConference';
    url = url + `?rnumbID=${rnumbID}`;
    return this.httpApp.get(url, this.auth.token);
  }

  /* Оплата отложенного платежа */
  public getPaymentTemp(paymentID: number, email: string | null, phone: string | null): Observable<ITalonResPaymentTemp> {
    let url = '/record/rnumb/paymenttemp';
    url = url + `?paymentID=${paymentID}`;
    if (email) {
      url = url + `&email=${email}`;
    }
    if (phone) {
      url = url + `&phone=${phone}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Отмена талона */
  public getRnumbCancel(rnumbID: number): Observable<ITalonResCansel> {
    let url = '/record/rnumb/cancel';
    if (rnumbID) {
      url = url + `?rnumbID=${rnumbID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* Разблокировка талона талона */
  public getRnumbUnlock(rnumbID: number): Observable<ITalonResCansel> {
    let url = '/record/rnumb/unlock';
    if (rnumbID) {
      url = url + `?rnumbID=${rnumbID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

  /* создание интервального расписания */
  public getRnumbCreateInterval(intervalID: number, dat_bgn: string, dat_end: string): Observable<ITalonResCansel> {
    let url = '/record/rnumb/create/interval';
    let params = {interval_id: intervalID, dat_bgn: dat_bgn, dat_end: dat_end};
    return this.httpApp.post(url , params, this.auth.token)
  }


}
