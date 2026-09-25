import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /* Получение времени */
  getTime(dt: Date | undefined): string {
    return dt ? moment(dt).format('HH:mm') : '';
  }

  /* Вывод дня недели */
  getNameDay(dt: Date | undefined): string {
    let str = '';
    if (dt) {
      let dn = moment(dt).isoWeekday();
      switch (dn) {
        case 1: { str = 'понедельник'; break;}
        case 2: { str = 'вторник'; break;}
        case 3: { str = 'среда'; break;}
        case 4: { str = 'четверг'; break;}
        case 5: { str = 'пятница'; break;}
        case 6: { str = 'суббота'; break;}
        case 7: { str = 'воскресенье'; break;}
      }
    }
    return str;
  }

  /* Вывод даты */
  getTekDayDATE (dt: Date | undefined): string {
    let day = '';
    if (dt) {
//      let d = 0;
      moment.locale('ru');
      const d = moment().startOf('day').diff(moment(dt).startOf('day') ,'days');
      switch (d) {
        case 0: { day = 'Сегодня, ' + moment(dt).format('D MMMM YYYY'); break;}
        case 1: { day = 'Завтра' + moment(dt).format('D MMMM YYYY'); break;}
//    case 3: { day = 'Послезавтра' + moment(dt).format('D MMM YYYY'); break;}
        default : { day =  moment(dt).format('D MMMM YYYY'); break;}
      }
    }
    return day;
  }

}
