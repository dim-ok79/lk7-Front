import { inject, Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import { dateToText, strToDate } from '../utils/global.function';
import {ILabOrder, ILabResearch, ILabSize} from "../interfaces/lab.interface";
import { IResearchFileList } from '../interfaces/laboratory-services.interface';
import { AppHttpService } from './application/app-http.service';
import { map } from 'rxjs/operators';
import { ConfigService } from './application/config.service';

@Injectable({
  providedIn: 'root'
})

export class LabService {
  private httpApp = inject(AppHttpService);
  private authS = inject(AuthService);
  private configS = inject(ConfigService);

  constructor() { }

/*
  public getlabsList(pbeginDate?: Date | null, pendDate?: Date | null, pStart?: number , pEnd?: number): Observable<ILabsList[]> {
    let url = '/labs/list';
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
    if (params.length>1){
      url = url + '?' + params.slice(1);
    }
//    return this.httpApp.get(url , this.auth.token);
    return this.httpApp.get(url , this.authS.token).pipe(
      map((res: ILabsList[]) => {
        res.forEach(item => item.regdate_date = strToDate(item.regdate_str))
        return res;
      })
    )

  }

  public getlabsListSize(pbeginDate?: Date | null, pendDate?: Date | null): Observable<ILabSize> {
    let url = '/labs/list/size';
    let params = '';
    if (pbeginDate) {
      params = params + `&beginDate=${dateToText(pbeginDate)}`;
    }
    if (pendDate) {
      params = params + `&endDate=${dateToText(pendDate)}`;
    }
    if (params.length>1){
      url = url + '?' + params.slice(1);
    }
    return this.httpApp.get(url , this.authS.token);
  }
*/

  /**
   *
   * @param begin
   * @param end
   * @returns {Observable<any>}
   */
  public getLaboratoryOrderSize(beginDate: Date | null, endDate: Date | null): Observable<ILabSize> {
    const param = new Array();

    if (beginDate) {
      param.push('beginDate=' + dateToText(new Date(beginDate)));
    }

    if (endDate) {
      param.push('endDate=' + dateToText(new Date(endDate)));
    }

    const pr = param.join('&');
//TomCat    return this.httpNew.get(`/api/patient/${this.auth.patientId}/laborder?beginDate=${begin}&endDate=${end}` , this.auth.token)
    const url = '/labs/orders/size?' + pr;
    return this.httpApp.get(url, this.authS.token);
  }

  /**
   *
   * @param begin
   * @param end
   * @param orderBy = acs / desc
   * @returns {Observable<any>}
   */
  public getLaboratoryOrderList(beginDate: Date | null, endDate: Date | null, pStart?: number , pEnd?: number, orderBy: string = 'acs'): Observable<ILabOrder[]> {
    const param = new Array();

    param.push('orderby=' + orderBy);

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
//TomCat    return this.httpNew.get(`/api/patient/${this.auth.patientId}/laborder?beginDate=${begin}&endDate=${end}` , this.auth.token)
    const url = '/labs/orders?' + pr;
//    return this.httpApp.get(url, this.authS.token);
    return this.httpApp.get(url , this.authS.token).pipe(
      map((res: ILabOrder[]) => {
        res.forEach(item => item.dtSort = strToDate(item.regdate))
        return res;
      })
    )

  }


  public getLaboratoryResearch(researchid: number): Observable<ILabResearch[]> {
    const param = new Array();
    param.push('researchid=' + researchid);
    const pr = param.join('&');
    const url = '/labs/research?' + pr;
    return this.httpApp.get(url, this.authS.token);
  }

  public getLaboratoryResearchHtml(researchid: number): Observable<string> {
    const param = new Array();
    param.push('researchid=' + researchid);
    const pr = param.join('&');
    const url = '/labs/research/html?' + pr;
    return this.httpApp.get(url, this.authS.token);
  }

  public getResearchFileList(researchid: number): Observable<IResearchFileList[]> {
    return this.httpApp.get(`/labs/research/files?researchid=${researchid}` ,  this.authS.token);
  }

/* Открытие файла PDF */
  openResearchPdf(p_research_id: number) {
    this.authS.getTmpTokenID()
      .subscribe(res => {
          if (res && res.id){
            window.open(`${this.configS.getValue('hostBackend')}/report/pdf/${res.id}/${p_research_id}.pdf`, '_blank');
          }
        },
        err => {
          console.error('getTmpTokenID ERRROr=', err);
        })

  }






}
