// import * as moment from "moment";
import moment from 'moment';

/**
 * Формируем необходимый формат YYYY-MM-DD для запроса
 * @param date
 * @returns {string}
 */
export let dateToText = (date: Date) => {
  let res: string;
  res = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  return res;
};

/**
 * Выбор уникальных значений из переданного массива
 * @param arr
 * @returns {string[]}
 */
export let unique = (arr: any) => {
  const obj: any = {};

  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    obj[str] = true;
  }
  return Object.keys(obj);
};


/**
 * Принудительное отображение скролла
 * необходима для двух страниц
 */
export let showScroll = () => {
  let html;
  html = document.getElementsByTagName('html')[0];
  html.style.overflowY = 'scroll';
};

/**
 * Скрытие (авто) скролл при уходе со станиц с принудительным скроллом
 */
export let hideScroll = () => {
  let html;
  html = document.getElementsByTagName('html')[0];
  html.style.overflowY = 'auto';
};

export let setLSItem = (itemName: string, jsonData: Object) => {
  if (typeof localStorage === 'undefined') {
    console.error('localStorage is undefined');
  } else {
    localStorage.setItem(itemName, JSON.stringify(jsonData));
  }
};

export let getLSKey = (itemName: string): string | null => {
  let d : string | null;
  if (typeof localStorage === 'undefined') {
    console.error('localStorage is undefined');
    return null;
  } else {
    d = localStorage.getItem(itemName);
    if (d) {
      return JSON.parse(d);
    } else {
      return null;
    }
  }
};

export let removeLSKey = (keyName: string) => {
  if (typeof localStorage === 'undefined') {
    console.error('localStorage is undefined');
  } else {
    localStorage.removeItem(keyName);
  }
};

export let getUnitsText = (num: number, cases: any) => {
  num = Math.abs(num);

  let word = '';

  if (num.toString().indexOf('.') > -1) {
    word = cases.gen;
  } else {
    word = (
      num % 10 === 1 && num % 100 !== 11
        ? cases.nom
        : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
        ? cases.gen
        : cases.plu
    );
  }

  return word;
};

/* Вывод даты */
export let getTekDayDATE = (dt: Date): string => {
  let day = '';
  let d = 0;
  moment.locale('ru');
  d = moment().startOf('day').diff(moment(dt).startOf('day') ,'days');
  switch (d) {
    case 0: { day = 'Сегодня, ' + moment(dt).format('D MMMM YYYY'); break;}
    case 1: { day = 'Завтра' + moment(dt).format('D MMMM YYYY'); break;}
//    case 3: { day = 'Послезавтра' + moment(dt).format('D MMM YYYY'); break;}
    default : { day =  moment(dt).format('D MMMM YYYY'); break;}
  }
  return day;
}

//норм дата
export let getTekDayNorm = (dt: Date): string => {
  let day = '';
  let d = 0;
  moment.locale('ru');
  d = moment().startOf('day').diff(moment(dt).startOf('day') ,'days');
  day =  moment(dt).format('D MMMM');
  return day;
}

/* Вывод даты */
export let getTekDay = (dt: Date): string => {
  let day = '';
  let d = 0;
  moment.locale('ru');
//  d = +moment(dt).format('DD') - (+moment().format('DD'));
//  d = moment().diff(moment(dt) ,'days');
  d = moment().startOf('day').diff(moment(dt).startOf('day') ,'days');
// .startOf('day') - удалить время
  /*
  console.log('*dt=', dt);
  console.log('*d=', d);
  console.log('*DIFF=', moment().diff(moment(dt) ,'days'));
  */
  switch (d) {
    case 0: { day = 'Сегодня'; break;}
//    case 1: { day = 'Завтра'; break;}
    default : { day = moment(dt).format('D MMMM'); break;}
  }
  return day;
}

/* Вывод дня недели */
export let getNameDay = (dt: Date): string => {
  let dn = moment(dt).isoWeekday();
  let str = '';
  switch (dn) {
    case 1: { str = 'понедельник'; break;}
    case 2: { str = 'вторник'; break;}
    case 3: { str = 'среда'; break;}
    case 4: { str = 'четверг'; break;}
    case 5: { str = 'пятница'; break;}
    case 6: { str = 'суббота'; break;}
    case 7: { str = 'воскресенье'; break;}
  }
  return str;
}

export let getTime = (dt: Date): string => {
  return moment(dt).format('HH:mm');
}


/* Подстановка окончания к существительному
* val - Значение (число)                       : 2
* str - Существительное (в единственном числе) : материал
* massStr - Массив окончаний                   : ['', 'а', 'ов']
* strEnd(2, 'материал', ['', 'а', 'ов']
 */
export let getStrEnd = (val: number  | undefined, str: string, massStr: string[]): string => {
  if (val && massStr.length ===3) {
    let strR: string[] = [];
    massStr.forEach(item => { strR.push(str + item)});
    return declOfNum(val, strR);
  } else {
    return '';
  }
}

function declOfNum(n: number, text_forms: string[]): string {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 == 1) { return text_forms[0]; }
  return text_forms[2];
}

/*
формат = "23.10.2021 10:40"
В БД = to_char(r.dat, 'dd.mm.yyyy HH24:MI') AS dat_bgn
 */
export let strToDate = (str: string): Date => {
  return new Date(Number(str.substr(6,4))
    ,Number(str.substr(3,2))-1
    ,Number(str.substr(0,2))
    ,Number(str.substr(11,2))
    ,Number(str.substr(14,2)));
}

export let strToDateURL = (str: string): Date => {
//  return new Date(str.replace(/(\d+).(\d+).(\d+) (\d+):(\d+)/, '$3/$2/$1 $4:$5:00+0000'));
  return new Date(Number(str.substr(6,4))
    ,Number(str.substr(3,2))-1
    ,Number(str.substr(0,2))
    ,Number(str.substr(11,2))
    ,Number(str.substr(14,2)));
}

interface ICookie {
  name: string;
  value: string;
};

export let parsCookie = (str: string): ICookie[] => {
  let rx = /([^;=\s]*)=([^;]*)/g;
  let r = [];
  for ( let m ; m = rx.exec(str) ; ) {
    r.push({name: m[1], value: m[2]});
  }
  return r;
}

export let findValueCookie = (str: string, name: string): string | null => {
  let res: string | null = null;
  let pc: ICookie[];
  pc = parsCookie(str);
  pc.forEach(item => {
    if (item.name == name){
      res = item.value;
    }
  });
  return res;
}

/**
 * вычесть дни
 * @param date
 * @param day - Количество дней
 * @returns {string}
 */
export let dateMinusDay = (date: Date, day: number) => {
  let dt: Date = new Date(date);
  return moment(dt).subtract(day,'d').toDate();
};

/**
 * Вывод даты с годом
 */
export let getDayWithYear = (dt: Date): string => {
  let day = '';
  let d = 0;
  moment.locale('ru');
  d = moment().startOf('day').diff(moment(dt).startOf('day') ,'days');

  switch (d) {
    case 0: { day = 'Сегодня'; break;}
    default : { day = moment(dt).format('D MMM YYYY'); break;}
  }
  return day;
}

