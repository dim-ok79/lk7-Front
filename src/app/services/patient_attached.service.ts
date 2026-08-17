/*
Сервис для работы со списком ЛПУ и прикреплений
 */
import {Injectable} from "@angular/core";
import {PatientService} from "./patient.service";

import {Observable} from "rxjs";
import {IPatientAttached} from "../interfaces/patient-attached.interface";
import { StoreService } from './application/store.service';

@Injectable({
  providedIn: 'root'
})
export class PatientAttachedService {
  private _attachedList: IPatientAttached[] = [];
  private _lsKey = 'attached';

  constructor(private  patient: PatientService) {
  }

  set attachedList(value: IPatientAttached[]) {
    this._attachedList = value;
    StoreService.setData(this._lsKey, value);
  }

  get attachedList(): IPatientAttached[] {
    return <IPatientAttached[]>StoreService.getData(this._lsKey);
  }

  // Очистка
  remove(): void {
    this._attachedList = [];
    StoreService.deleteStoreNameKey(this._lsKey);
  }

  // Выбранный ЛПУ
  selected(): IPatientAttached | null {
    if (this.attachedList && this.attachedList.length>0){
      this._attachedList = this.attachedList ;
      return this._attachedList.filter(item => item.selected)[0];
    } else {
      return null;
    }
  }

  // ЛПУ выбран
  select(lpu: IPatientAttached): void {
    this._attachedList = this.attachedList;
    this._attachedList.forEach(item => {
      item.selected = item.id === lpu.id;
    })
    this.attachedList = this._attachedList;
  }

  // Загрузка с сервера

  loadServer(): Observable<IPatientAttached[]> {
    return new Observable((observer) => {
      this.patient.getLpuList$()
        .subscribe(res => {
          res.forEach(item => {
            item.selected = item.ispatient>0;
          });
          this.attachedList = res;
          observer.next(this.attachedList);
        })
    });
  }

}
