import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {
  IHistoryDiag, IHistoryEventFiles,
  IHistoryEventList,
  IHistoryEvents,
  IHistoryItemHtmlList,
  IHistoryVisit, ILabSize
} from '../interfaces/history.interface';
import {Observable} from "rxjs";
// import {IService, IServiceSize} from "../interfaces/services";
import { dateToText, strToDate } from '../utils/global.function';
// import {ILabSize} from "../interfaces/lab.interface";
import { AppHttpService } from './application/app-http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private httpApp: AppHttpService, private auth: AuthService) { }


  /**
   * Количество истории (Visit Diag)
   * @param parameters
   */
  public getHistoryEventsSize(beginDate: Date | null, endDate: Date | null): Observable<ILabSize> {
    let url = '/history/events/size';
    if (beginDate && endDate) {
      url = url + `?beginDate=${dateToText(beginDate)}&endDate=${dateToText(endDate)}`;
    }

    if (!beginDate && endDate) {
      url = url + `?endDate=${dateToText(endDate)}`;
    }

    console.log('URL=', url)
    return this.httpApp.get(url , this.auth.token);
  }

  /**
   * Список истории (Visit Diag)
   * @param parameters
   */
  public getHistoryEvents(pStart: number , pEnd: number, beginDate: Date | null, endDate: Date | null): Observable<IHistoryEvents[]> {
    let url = '/history/events';
    if (pStart && pEnd) {
      url = url + `?start=${pStart}&end=${pEnd}`;
      if (beginDate && endDate) {
        url = url + `&beginDate=${dateToText(beginDate)}&endDate=${dateToText(endDate)}`;
      }
      if (!beginDate && endDate) {
        url = url + `&endDate=${dateToText(endDate)}`;
      }
    } else {
      if (beginDate && endDate) {
        url = url + `?beginDate=${dateToText(beginDate)}&endDate=${dateToText(endDate)}`;
      }
      if (!beginDate && endDate) {
        url = url + `&endDate=${dateToText(endDate)}`;
      }
    }

//    return this.httpApp.get(url , this.auth.token);
    return this.httpApp.get(url , this.auth.token).pipe(
      map((res: IHistoryEvents[]) => {
        res.forEach(item => item.dtSort = strToDate(item.dat))
        return res;
      })
    )
  }

/*

  /!**
   * Список файлов на визите
   * @param parameters
   *!/
  public getHistoryEventFiles(visitID: number): Observable<IHistoryEventFiles[]> {
    let url = `/history/event/files/${visitID}`;
    return this.httpApp.get(url , this.auth.token);
  }

  /!**
   * Список истории за указанный промежуток времени
   * @param parameters
   * @returns {Observable<IHistoryEventList[]>}
   *!/
  public getHistoryEventList(parameters: { begin: string, end: string }): Observable<IHistoryEventList[]> {
    const {begin, end} = parameters;
    const url = '/api/patient/' + this.auth.patientId + '/history/event?beginDate=' + begin + '&endDate=' + end;
    return this.httpApp.get(url, this.auth.token);
  }

  /!**
   * Получить событие по его типу и идентификатору
   * @param parameters
   * @returns {Observable<IHistoryVisit[] | IHistoryDiag[]>}
   *!/
  public getHistoryItem(parameters: { id: number, typeHistory: string }): Observable<IHistoryItemHtmlList[]> {
    const url = `/history/events/item?typeRes=${parameters.typeHistory}&id=${parameters.id}`;
    return this.httpApp.get(url, this.auth.token);
  }


  /!**
   * Получить список услуг
   *!/

  public getServices( beginDate: Date | null, endDate: Date | null, pStart?: number , pEnd?: number): Observable<IService[]> {
    const param = new Array();

    if (beginDate) {
      param.push('beginDate=' + dateToText(new Date(beginDate)));
    }

    if (endDate) {
      param.push('endDate=' + dateToText(new Date(endDate)));
    }
    if (pStart && pEnd) {
      param.push('start=' + pStart);
      param.push('end=' + pEnd);
    }

    const pr = param.join('&');
//        8 16:26 http://localhost:8090/pa-web/api/service/patient/262535?beginDate=2008-01-01&endDate=2019-04-30"
//TomCat    const url = '/api/service/patient/' + this.auth.patientId + '?' + pr;
    const url = '/service/patient?' + pr;
    return this.httpApp.get(url, this.auth.token);
  }

  /!**
   * Получить список услуг - количество записей
   *!/

  public getServicesSize( beginDate: Date | null, endDate: Date | null ): Observable<IServiceSize> {
    const param = new Array();

    if (beginDate) {
      param.push('beginDate=' + dateToText(new Date(beginDate)));
    }

    if (endDate) {
      param.push('endDate=' + dateToText(new Date(endDate)));
    }

    const pr = param.join('&');
//        8 16:26 http://localhost:8090/pa-web/api/service/patient/262535?beginDate=2008-01-01&endDate=2019-04-30"
//TomCat    const url = '/api/service/patient/' + this.auth.patientId + '?' + pr;
    const url = '/service/patient/size?' + pr;
    return this.httpApp.get(url, this.auth.token);
  }
*/


}
