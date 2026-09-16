import { inject, Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {dateToText} from "../utils/global.function";
import {ILabOrder, ILabResearch, ILabSize} from "../interfaces/lab.interface";
import {IResearchFileList} from "../interfaces/laboratory-services.interface";
import { AppHttpService } from './application/app-http.service';

@Injectable({
  providedIn: 'root'
})

export class LabService {
  private httpApp = inject(AppHttpService);
  private auth = inject(AuthService);

  constructor() { }

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
    return this.httpApp.get(url, this.auth.token);
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
    return this.httpApp.get(url, this.auth.token);
  }


  public getLaboratoryResearch(researchid: number): Observable<ILabResearch[]> {
    const param = new Array();
    param.push('researchid=' + researchid);
    const pr = param.join('&');
    const url = '/labs/research?' + pr;
    return this.httpApp.get(url, this.auth.token);
  }

  public getLaboratoryResearchHtml(researchid: number): Observable<string> {
    const param = new Array();
    param.push('researchid=' + researchid);
    const pr = param.join('&');
    const url = '/labs/research/html?' + pr;
    return this.httpApp.get(url, this.auth.token);
  }

  public getResearchFileList(researchid: number): Observable<IResearchFileList[]> {
    return this.httpApp.get(`/labs/research/files?researchid=${researchid}` ,  this.auth.token);
  }



}
