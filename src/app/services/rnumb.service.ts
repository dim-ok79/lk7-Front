import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {IRnumbList} from "../interfaces/rnumb.interface";
import { IServ, ITalonInfo } from '../interfaces/record.interface';
import { AppHttpService } from './application/app-http.service';
import { map } from 'rxjs/operators';
import { strToDate } from '../utils/global.function';
import { Isrvlist } from '../interfaces/frame2/lpu.interface';

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

  /* Информация о талоне */
  public getRnumbInfo(rnumbID: number): Observable<ITalonInfo[]> {
    let url = '/record/rnumb/info';
    if (rnumbID) {
      url = url + `?rnumbID=${rnumbID}`;
    }
    return this.httpApp.get(url, this.auth.token);
  }

}
