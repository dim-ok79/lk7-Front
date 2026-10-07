import { inject, Injectable } from '@angular/core';
import {Icity, IDoc, IDocAll, IDocURL, Ilpu, ISpec} from "../interfaces/frame2/lpu.interface";
import {Observable, Subject} from "rxjs";
import { AppHttpService } from './application/app-http.service';
import { IRnumb } from '../interfaces/frame2/rnumb.interface';
import { AuthService } from './auth.service';


const prefix_module = 'lpu';

@Injectable({
  providedIn: 'root'
})
export class LpuService {
  private _lpuList: Ilpu[] = [];

  // Событие Выбора ЛПУ
  LpuSelectSubject = new Subject<Ilpu>();
  LpuSelect(param: Ilpu) {  // Установить параметры для Блок Rnumb
    if (this.LpuSelectSubject) {
      this.LpuSelectSubject.next(param);
    }
  }
  // Событие Выбора
  LpuOnSelect$(): Observable<Ilpu> {
    return this.LpuSelectSubject.asObservable();
  }

  // Событие добавление ЛПУ
  LpuAddSubject = new Subject<Ilpu>();
  LpuAdd(param: Ilpu) {  // Установить параметры для Блок Rnumb
// console.log('!!! LpuAdd this.LpuAddSubject=', this.LpuAddSubject);
    if (this.LpuAddSubject) {
//console.log('!!! LpuAdd NEXT=', param);
      this.LpuAddSubject.next(param);
    }
  }
  // Добавить ЛПУ
  LpuOnAdd$(): Observable<Ilpu> {
    return this.LpuAddSubject.asObservable();
  }
/////////////
/*
  private eventSubject = new Subject<string>();

  // Публичный Observable для подписки из компонентов
  public event$: Observable<string> = this.eventSubject.asObservable();

  // Метод для вызова события
  emitEvent(data: string) {
    this.eventSubject.next(data);
  }
*/


// Создаем глобальный сигнал
/*
  private sharedMessage = signal<string>('Начальное значение');

  // Метод для чтения
  readonly message = this.sharedMessage.asReadonly();

  // Метод для изменения
  updateMessage(newMessage: string) {
    this.sharedMessage.set(newMessage);
  }

  public testMessage = signal('111222');

  update_testMessage(newMessage: string) {
    this.testMessage.set(newMessage);
  }
*/

///////////////
  private auth = inject(AuthService);

  constructor(private httpApp: AppHttpService) {
    console.log('!!! LpuService LOADING constructor');

  }

  // Загрузка с сервера
/*
  loadLpuList(): Observable<Ilpu[]> {
    return new Observable((observer) => {
      this.getLpuList$()
        .subscribe(res => {
          this._lpuList = res;
          observer.next(this._lpuList);
        })
    });
  }
*/

  getLpuFromId(id: number): Ilpu | null {
    const tmp = this._lpuList.filter(item => item.id == id);
    if (tmp && tmp.length>0){
      return tmp[0];
    } else {
      return null;
    }
  }

  getLpuList(): Ilpu[] {
    return this._lpuList;
  }

  public getLpuList$(): Observable<Ilpu[]> {
    console.log('111 LPU list token=', this.auth.token);
    return this.httpApp.get(`/${prefix_module}/list`, this.auth.token)
  }

  public getSpecList$(): Observable<ISpec[]> {
    return this.httpApp.get(`/${prefix_module}/speclist`, this.auth.token)
  }

  public getDocList$(spec_id : number): Observable<IDoc[]> {
    return this.httpApp.get(`/${prefix_module}/doclist?p_spec_id=${spec_id}`, this.auth.token)
  }

  public getRnumbList$(spec_id : number, doctor_id : number, srv_ids: string | null): Observable<IRnumb[]> {
    return this.httpApp.get(`/${prefix_module}/rnumblist?spec_id=${spec_id}
                                              &doctor_id=${doctor_id}
                                              &srv_ids=${srv_ids}`, this.auth.token)
  }

  public getDocURL$(doctor_id: number): Observable<IDocURL[]> {
    return this.httpApp.get(`/${prefix_module}/getdocurl?p_doctor_id=${doctor_id}`, this.auth.token)
  }

  public getDocAll$(): Observable<IDocAll[]> {
    return this.httpApp.get(`/${prefix_module}/doc-list-all`, this.auth.token)
  }

}
