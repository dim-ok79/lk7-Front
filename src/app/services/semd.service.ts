import { inject, Injectable } from '@angular/core';
import { AppHttpService } from './application/app-http.service';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { dateToText, strToDate } from '../utils/global.function';
import { Observable } from 'rxjs';
import { ISemd } from '../interfaces/semd.interface';
import { ILabSize } from '../interfaces/lab.interface';
import { ConfigService } from './application/config.service';

@Injectable({
  providedIn: 'root'
})
export class SemdService {
  private httpApp = inject(AppHttpService);
  private authS = inject(AuthService);
  private configS = inject(ConfigService);


  constructor() { }

  /**
   * Список СЭМД по визиту
   * @param parameters
   */
  public getSemdList(visitID: number): Observable<ISemd[]> {
    let url = '/semd/list';
    url = url + `?visitID=${visitID}`;
    return this.httpApp.get(url , this.authS.token).pipe(
      map((res: ISemd[]) => {
        res.forEach(item => item.dat_date = strToDate(item.dat_str))
        return res;
      })
    )
  }

  /**
   * Список СЭМД по пациенту
   * @param parameters
   */
  public getSemdPatientList(pbeginDate?: Date | null, pendDate?: Date | null, pStart?: number , pEnd?: number, pType?: number): Observable<ISemd[]> {
    let url = '/semd/patient/list';
    let params = '';
    if (pStart && pEnd) {
      params = params + `&start=${pStart}&end=${pEnd}`;
    }
    if (pbeginDate) {
      params = params + `&beginDate=${dateToText(pbeginDate)}`;
    }
    if (pendDate) {
      params = params + `&endDate=${dateToText(pendDate)}`;
    }
    if (pType) {
      params = params + `&p_type=${pType}`;
    } else {
      params = params + `&p_type=1`;
    }
    if (params.length>1){
      url = url + '?' + params.slice(1);
    }
    return this.httpApp.get(url , this.authS.token).pipe(
      map((res: ISemd[]) => {
        res.forEach(item => item.dat_date = strToDate(item.dat_str))
        return res;
      })
    )

  }

  /**
   * Список СЭМД по пациенту
   * @param parameters
   */
  public getSemdPatientListSize(pbeginDate?: Date | null, pendDate?: Date | null, pType?: number): Observable<ILabSize> {
    let url = '/semd/patient/list/size';
    let params = '';
    if (pbeginDate) {
      params = params + `&beginDate=${dateToText(pbeginDate)}`;
    }
    if (pendDate) {
      params = params + `&endDate=${dateToText(pendDate)}`;
    }
    if (pType) {
      params = params + `&p_type=${pType}`;
    } else {
      params = params + `&p_type=1`;
    }

    if (params.length>1){
      url = url + '?' + params.slice(1);
    }
    return this.httpApp.get(url , this.authS.token);
  }


  /**
   * Список СЭМД
   * @param parameters
   */
  public getSemdTest(): Observable<any> {
    return this.httpApp.get('/semd/test' , this.authS.token).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  public onClickSEMD(p_semd_id: number) {
    this.authS.getTmpTokenID()
      .subscribe(res => {
          if (res && res.id){
            window.open(`${this.configS.getValue('hostBackend')}/semd/visit/${res.id}/${p_semd_id}.pdf`, '_blank');
          }
        },
        err => {
          console.error('getTmpTokenID ERRROr=', err);
        })
  }

}
