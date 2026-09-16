import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AppHttpService} from "./application/app-http.service";
import {
  IContract,
  ICreatePatient,
  IDogListForSig,
  IDogSignatureRes, IPatientExt,
  ITokenAndPatientId,
  IUser
} from "../interfaces/patient.interface";
import {StoreService} from "./application/store.service";
import {IHttpRequest} from "../interfaces/httpRes.interface";
import {Observable, throwError} from "rxjs";
import {dateToText} from "../utils/global.function";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string | null;
  public patientId: number | null;

  /**
   * Генерация сообщений об ошибках
   * @param error
   * @returns {any}
   */
  private static handleError(error: any): any {
    let message = '';

    if (!error.json().success) {
      if (error.json().data.errorCode === 'WrongLoginData') {
        message = 'Неверно указаны имя пользователя или пароль';
      }
      if (error.json().data.errorCode === 'Exception') {
        message = 'Не удается связаться с сервером, повторите попытку позднее';
      }
    } else {
      message = error.data ? error.data : error.toString();
    }
    return throwError(() => new Error(message));
  }

  constructor(private router: Router, private httpNew: AppHttpService) {
    const Patient = <IUser>StoreService.getData('Patient');
    if (Patient && Patient.token) {
      this.token = Patient.token;
    } else {
      this.token = null;
    }
    if (Patient && Patient.patientId) {
      this.patientId = Patient.patientId;
    } else {
      this.patientId = null;
    }
  }


  /**
   *
   * @param user
   * @param passwd
   * @returns {Observable<any>}
   */
  public login$(user: string, passwd: string): Observable<boolean> | any {
    return new Observable((observer) => {
      return this.httpNew.post('/api/login' , {login: user, passwd: passwd}, null)
        .subscribe(
          result => {
            let tmp = result;
            if (tmp && tmp.length === 1) {
              tmp = tmp[0];
            }

            if (tmp && tmp.token && tmp.patientid) {
              let r = Object.assign({token: tmp.token, patientId: tmp.patientid})
              if (tmp.ext){
                r = Object.assign(r, {ext: tmp.ext});
              }
              observer.next(r);
            } else {
              observer.error(false);
            }
          },
          err => {
            observer.error(err);
          }
        );
    });
  }

  public reg$(patient: ICreatePatient): Observable<IHttpRequest> {
// console.log('patient.birthDate=', patient.birthDate);
    if (patient.birthDate) {
      patient.birthDate = dateToText(new Date(patient.birthDate));
    }
    return new Observable((observer) => {
      return this.httpNew.post('/api/patient' , patient, null, true)
        .subscribe(
          result => {
            observer.next(result);
          },
          err => {
            observer.error(err);
          }
        );
    });
  }

  public loginOk$(token: string, patientId: number, ext: IPatientExt[] | null): boolean {
    this.token = token;
    this.patientId = patientId;
    // Записываем токен в хранилище
    StoreService.setData('Patient', {token: token, patientId: patientId});
    if (ext && ext[0]){
      ext.forEach(item => {
        StoreService.setData(item.name, {val: item.value});
      });
    }
    return true;
  }



  /**
   * Проверка авторизован ли пользователь в данный момент
   * @returns {boolean}
   */
  public isLogged(): boolean {
    return this.token != null && this.patientId != null;
  }

  /**
   * Смена пользователя
   * @param token
   * @param patientId
   * @param ext
   */
  private setTokenToPatient(token: string, patientId: number, ext: IPatientExt[] | null): void {
    this.loginOk$(token, patientId, ext);
  }
  /**
   * Выход из системы и вход под другим токеном - вход для семейного
   */
  public loginGoToken(token: string, patientId: number, ext: IPatientExt[] | null): void {
    this.serverLogout(this.token!) // выход
      .subscribe(
        result => {
          this.token = null;
          this.patientId = null;
          StoreService.clearAllStore();
          this.setTokenToPatient(token, patientId, ext);
          window.location.href = '/login';
        }, err => {
          this.setTokenToPatient(token, patientId, ext);
          window.location.href = '/login';
        }
      );

  }

  /**
   * Выход из системы, осуществляется только при выполненной авторизации
   */

  public logout(): void {
//     console.log('Exit111 URL=', this.router.url);
    if (this.token) {
      this.serverLogout(this.token)
        .subscribe(
          result => {
            this.token = null;
            this.patientId = null;
            StoreService.clearAllStore();
            this.router.navigate(['/login']);
          }
        );
    }
  }


  /**
   * Процедура logout'a на стороне сервера
   * @param token
   * @returns {Observable<boolean>}
   */
  public serverLogout(token: string): Observable<boolean> {
    return this.httpNew.post('/api/logout' , null, this.token)
  }

/*
  /!**
   * Смена пароля
   * @param pOldPassword - Старый пароль
   * @param pNewPassword - Новый пароль
   * @returns {Observable<boolean>}
   *!/
  public changepw(pOldPassword: string, pNewPassword: string): Observable<any> {
    return this.httpNew.post('/api/changepw' , {oldPassword: pOldPassword, newPassword: pNewPassword}, this.token);
  }
*/

/*
  /!**
   * Восстановление пароля
   * @param  lastName='' - фамилия
   * @param  firstName='' - имя
   * @param  secondName='' - отчество
   * @param  birthDate='' - дата рождения в формате dd_MM_yyyy
   * @param  email='' - электронная почта
   * @returns {Observable<boolean>}
   *!/
  public findpatientchangepw(pLastName: string, pFirstName: string, pSecondName: string, pBirthDate: string, pEmail: string, pCaptcha: string, pCaptchaSolid: string): Observable<any> {
    return this.httpNew.post('/api/findpatientchangepw' , {lastName: pLastName, firstName: pFirstName, secondName: pSecondName, birthDate: pBirthDate, email: pEmail, captcha: pCaptcha, captchaSolid: pCaptchaSolid}, null, true);
  }
*/

/*
  /!**
   * Проверка токена на восстановление
   * @param  pToken='' - токен
   * @returns {Observable<boolean>}
   *!/
  public checktr(pToken: string): Observable<any> {
    return this.httpNew.post('/api/checktr' , {token: pToken}, null);
  }
*/

/*
  /!**
   * смена пароля пациенту по токену
   * @param  pToken='' - токен
   * @param  pNewpw='' - новый пароль
   * @returns {Observable<boolean>}
   *!/
  public changepwtoken(pToken: string, pNewpw: string): Observable<any> {
    return this.httpNew.post('/api/changepwtoken' , {token: pToken, newpw: pNewpw}, null);
  }
*/



  /***** Договора  ********/

  /* Список договоров (не подписанных) */
  public getContractList(tmp: ITokenAndPatientId): Observable<IDogListForSig[]> {
    const url = '/contract/patient/list/sig';
    return this.httpNew.get(url, tmp.token);
  }

  /* Подписать договор */
  public postContract(tmp: ITokenAndPatientId, templateId: number): Observable<IDogSignatureRes> {
    const url = `/contract/sig?patientId=${tmp.patientId}&contractId=${templateId}`;
    return this.httpNew.get(url , tmp.token);

  }

  /* Список подписанных договоров */
  public getContractListToPatient(): Observable<IContract[]> {
    const url = '/contract/patient/list';
    return this.httpNew.get(url,  this.token);
  }

  /* Список подписанных договоров */
  public getTmpTokenID(): Observable<any> {
    const url = '/auth/id';
    return this.httpNew.get(url,  this.token);
  }


}

