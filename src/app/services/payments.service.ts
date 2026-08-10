import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {IPayment, IPaymentInfo, IPaySystemInfo, IRnumbInfoByPayment} from "../interfaces/payments.interface";
import { dateToText, strToDate } from '../utils/global.function';
import { AppHttpService } from './application/app-http.service';
import { ISize } from '../interfaces/application.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private httpApp: AppHttpService, private auth: AuthService) {}
  /*
  * @apiParam {Number} typePay  Тип платежа (22 - аванс)
  * @apiParam {Number} amount  Сумма
  * @apiParam {String} email  Почта
  * @apiParam {String} phone  Телефон
  * @apiParam {String} police Полис = ''
  */
// /payments/patient/temp
  // Тип платежной системы
  public getPayTemp(typePay: Number, amount: Number | null, email: String | null, phone: String | null, police: String | null): Observable<any> {
    const param = new Array();

    param.push('typePay=' + typePay);
    param.push('amount=' + amount);

    if (email != null) {
      param.push('email=' + email);
    }
    if (phone != null) {
      param.push('phone=' + phone);
    }
    if (police != null) {
      param.push('police=' + police);
    }

    const pr = param.join('&');
//TomCat    return this.httpNew.get(`/api/service/patient/${this.auth.patientId}/payments?${pr}`, this.auth.token);
    const url = '/payments/patient/temp?' + pr;
    return this.httpApp.get(url, this.auth.token);
  };


  // Оплата
  public getPayOrder(orderid: number): Observable<any> {
    return this.httpApp.post(`/pay/order`, {orderid: orderid}, this.auth.token);
  };

  // Тип платежной системы
  public getPaySystem(): Observable<IPaySystemInfo> {
    return this.httpApp.get(`/pay/paysystem`, this.auth.token);
  };

  // Список платежей по пациенту
  public getPayments(pBeginDate: Date | null, pEndDate: Date |null, pStart?: number , pEnd?: number, orderBy: string | null = 'acs'): Observable<IPayment[]> {
    const param = new Array();
    if (pBeginDate != null) {
      param.push('beginDate=' + dateToText(pBeginDate));
    }
    if (pEndDate != null) {
      param.push('endDate=' + dateToText(pEndDate));
    }

    if (pStart && pEnd) {
      param.push('start=' + pStart);
      param.push('end=' + pEnd);
    }

    if (orderBy) {
      param.push('orderBy=' + orderBy);
    }

    const pr = param.join('&');
    const url = '/payments/patient?' + pr;
    return this.httpApp.get(url , this.auth.token).pipe(
      map((res: IPayment[]) => {
        res.forEach(item => {
          item.dtSort = strToDate(item.pt_dat_str);
          item.services.forEach(itemS => {
            if (itemS.dtstr && itemS.dtstr.length > 10){
              itemS.dt = strToDate(itemS.dtstr);
            } else {
              itemS.dt = null;
            }
          });
        })
        return res;
      })
    )
  };

  /**
   * Получить количество записей
   */

  public getPaymentsSize( beginDate: Date | null, endDate: Date | null ): Observable<ISize> {
    const param = new Array();

    if (beginDate) {
      param.push('beginDate=' + dateToText(new Date(beginDate)));
    }

    if (endDate) {
      param.push('endDate=' + dateToText(new Date(endDate)));
    }

    const pr = param.join('&');
    const url = '/payments/patient/size?' + pr;
    return this.httpApp.get(url, this.auth.token);
  }

  // Информация о платеже
  public getPayment(paymentId: number): Observable<IPaymentInfo[]> {
    return this.httpApp.get(`/api/service/payment/${paymentId}`, this.auth.token);
  };

  /* Получение информации о платеже из талона */
  public getRnumbInfoByPayment(paymentId: number): Observable<IRnumbInfoByPayment[]> {
    return this.httpApp.get(`/api/payment/${paymentId}/rnumb/info`, this.auth.token);
  }

  /* Получение баланса по пациенту */
  public getBalanse(): Observable<any> {
    return this.httpApp.get(`/payments/patient/balanse`, this.auth.token);
  }

}
