/*
Сервис по работе Высотой основного блока
17-05-2022 Событийную часть отключил, работает из LS
 */

import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import { ISize } from "../interfaces/size.interface";
import { StoreService } from './application/store.service';

const storeKey = 'WEB_LK_DEVICE_TYPE';

@Injectable()
export class Size {
  private h :ISize = {outletH: 0, blockHeaderH:91};
  private width: number = 0;
  deviceType: string = 'pc';
  pc: string = 'pc' as const;
  mobile: string = 'mobile' as const;
  tablet: string = 'tablet' as const;
//  deviceTypeSubject = new Subject<string>();

  resizeSubject = new Subject<ISize>();

  setH(hh: ISize) {
    this.h = hh;
    if (this.resizeSubject) {
      this.resizeSubject.next(this.h);
    }
  }

  // Событие изменение размера
  onResize$(): Observable<ISize> {
    return this.resizeSubject.asObservable();
  }

  // Получить высоту
  getH(): ISize {
      return this.h;
  }

// Тип девайса
  setW(width: number){
console.log('width=', width);
    this.width = width;
    this.setDeviceType(width);
  }

  setDeviceType(width: number) {
    if (width > 768) {
        this.deviceType = this.pc;
    } else {
        this.deviceType = this.mobile;
    }
    // Сохраняем
    StoreService.setData(storeKey, {val: this.deviceType});
  }

  // Получить тип девайса
  getDeviceType(): string {
      // Получаем в текущих настройках
      const d = <any>StoreService.getData(storeKey);
      if (d && d.val) {
          return d.val
      } else {
          return 'not';
      }
  }

}
