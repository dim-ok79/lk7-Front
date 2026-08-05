import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {IRnumbList} from "../interfaces/rnumb.interface";
import {IServ} from "../interfaces/record.interface";
import { AppHttpService } from './application/app-http.service';
import { map } from 'rxjs/operators';
import { IHistoryEvents } from '../interfaces/history.interface';
import { strToDate } from '../utils/global.function';

@Injectable({
  providedIn: 'root'
})
export class RnumbService {

  constructor(private httpApp: AppHttpService, private auth: AuthService) { }

  /**
   * Список талонов
   * @param parameters
   */
  public getRnumbList(): Observable<IRnumbList[]> {
    let url = '/rnumb/list';
//    return this.httpApp.get(url , this.auth.token);
    return this.httpApp.get(url , this.auth.token).pipe(
      map((res: IRnumbList[]) => {
        res.forEach(item => item.beginDate = strToDate(item.dat_bgn))
        return res;
      })
    )

  }

  /**
   * Услуги на талон талонов
   * @param parameters
   */
  public getRnumbSrv(rnumbID: number): Observable<IServ> {
    let url = '/record/rnumb/serv';
    url = url + `?rnumbID=${rnumbID}`;
    return this.httpApp.get(url , this.auth.token);
  }
}
