import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IFamily, IInetuserLog, IInetuserLogSize, IPatient, IPolice, IStatementParam} from "../interfaces/patient.interface";
import {AuthService} from "./auth.service";
import {ICityBE} from "../interfaces/city.interface";
import {IPatientAttached} from "../interfaces/patient-attached.interface";
import { AppHttpService } from './application/app-http.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpApp: AppHttpService, private auth: AuthService) { }

  public getServerPatientInfo$(token?: string | null): Observable<IPatient> {
    if (token) {
      return this.httpApp.get(`/patient/info` , token)
    } else {
      return this.httpApp.get(`/patient/info` , this.auth.token)
    }
  }

  public getPatientPolice$(token?: string | null): Observable<IPolice> {
    if (token) {
      return this.httpApp.get(`/patient/police` , token)
    } else {
      return this.httpApp.get(`/patient/police` , this.auth.token)
    }
  }

  public getCityList$(token: string): Observable<ICityBE[]> {
    return this.httpApp.get(`/patient/city` , token)
  }

  public getAttachedList$(token: string): Observable<IPatientAttached[]> {
    return this.httpApp.get(`/lpu/list` , token)
  }


  public getFamilyList$(): Observable<IFamily[]> {
    return this.httpApp.get(`/api/family` , this.auth.token)
  }

  /* Смена пароля*/
/*
  public changepasswd$(pOldPassword: string, pNewPassword: string ): Observable<any> {
    return this.httpApp.post(`/api/changepasswd` , {oldPassword: pOldPassword, newPassword: pNewPassword} , this.auth.token)
  }
*/

  /* Количество активности пользователя*/
  public getInetuserLogSize$(): Observable<IInetuserLogSize> {
// TomCat    return this.httpApp.get('/api/log/size' , this.auth.token);
    return this.httpApp.get('/log/size' , this.auth.token);
  }
// /api/log/size

  /* Список активности пользователя*/
  public getInetuserLog$(pStart?: number , pEnd?: number): Observable<IInetuserLog[]> {
    let url = '/log/rec';
    if (pStart && pEnd) {
      url = url + `?start=${pStart}&end=${pEnd}`;
    }
    return this.httpApp.get(url , this.auth.token);
  }

  // Список параметров заявлений
  public getStatementType$(): Observable<any> {
    return this.httpApp.get(`/statement/params` , this.auth.token)
  }

/*
  // Список параметров заявлений
  public getStatementParam$(pTypeId: number): Observable<IStatementParam[]> {
//    return this.httpApp.get(`/api/patient/${this.auth.patientId}/statement/type` , this.auth.token)
    return this.httpApp.get(`/api/patient/${this.auth.patientId}/statement/type/${pTypeId}/param` , this.auth.token)
  }
*/

  // Запись параметров, формирование заявления и его отправка
  public getStatementSave$(pTypeId: number, pDate: string): Observable<any> {
    return this.httpApp.post(`/statement/create` , {statement_params: pDate}, this.auth.token, true);
  }


/*
  public create_pw$(): Observable<any> {
      return this.httpApp.get(`/patient/create_pw` , this.auth.token)
  }
*/


}
