import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ICalendarDateItem, IDateRange, IDateRangeCalendarData} from "../interfaces/date-range.interface";

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  /* События календаря */

  // Событие инициализации
  CalendaryinitSubject = new Subject<IDateRangeCalendarData>();
  CalendarySetParams(param: IDateRangeCalendarData) {  // Установить параметры для календаря
    if (this.CalendaryinitSubject) {
      this.CalendaryinitSubject.next(param);
    }
  };

  CalendaryonInit$(): Observable<IDateRangeCalendarData> {
    return this.CalendaryinitSubject.asObservable();
  }

  // Выбор дня в календаре
  CalendarySelectDaySubject = new Subject<Date>();
  CalendarySelectDay(param: Date) {  // Установить параметры для календаря
    if (this.CalendarySelectDaySubject) {
      this.CalendarySelectDaySubject.next(param);
    }
  };
  CalendaryOnSelectDay$(): Observable<Date> {
    return this.CalendarySelectDaySubject.asObservable();
  }

  // Установка дня в календаре
  CalendarySetDateRangeSubject = new Subject<IDateRange>();
  CalendarySetDateRange(param: IDateRange) {  // Установить параметры для календаря
    if (this.CalendarySetDateRangeSubject) {
      this.CalendarySetDateRangeSubject.next(param);
    }
  };
  CalendaryOnSetDateRange$(): Observable<IDateRange> {
    return this.CalendarySetDateRangeSubject.asObservable();
  }

  // Наведение на дату
  CalendaryHoverDaySubject = new Subject<ICalendarDateItem>();
  CalendaryHoverDay(param: ICalendarDateItem) {  // Установить
    if (this.CalendaryHoverDaySubject) {
      this.CalendaryHoverDaySubject.next(param);
    }
  };
  CalendaryOnHoverDay$(): Observable<ICalendarDateItem> {
    return this.CalendaryHoverDaySubject.asObservable();
  }

  constructor() { }
}
