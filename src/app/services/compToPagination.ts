/*
Сервис связи компонент с пагинацией
 */

import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class compToPagination {

  pageSubject = new Subject<number>();

  setPage(num: number) {  // Установить страницу
    if (this.pageSubject) {
      this.pageSubject.next(num);
    }
  }

  // Событие изменение страници
  onChangedPage$(): Observable<number> {
    return this.pageSubject.asObservable();
  }

}
