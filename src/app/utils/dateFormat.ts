import  moment from "moment";

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

/* Строку из запросов в дату */
export let strToDate = (str: string): Date => {
  return new Date(Number(str.substr(6,4))
    ,Number(str.substr(3,2))-1
    ,Number(str.substr(0,2))
    ,Number(str.substr(11,2))
    ,Number(str.substr(14,2)));
}

/* Дата без времени*/
export let strToDateNotTime = (str: string): Date => {
  return new Date(Number(str.substr(6,4))
    ,Number(str.substr(3,2))-1
    ,Number(str.substr(0,2))
    ,Number(0)
    ,Number(0));
}

export let strToDateURL = (str: string): Date => {
  return new Date(Number(str.substr(6,4))
    ,Number(str.substr(3,2))-1
    ,Number(str.substr(0,2))
    ,Number(str.substr(11,2))
    ,Number(str.substr(14,2)));
}

/* Время для показа на талоне */
export let getTime = (dt: Date | undefined): string =>{
  if (dt) {
    return moment(dt).format('HH:mm');
  } else {
    return '';
  }
}


export let getTekDay = (dt: Date): string =>{
  if (dt){
    return moment(dt).format('D MMMM YYYY');
  } else {
    return '';
  }
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

export let getNameDayMobail = (dt: Date): string => {
  let dn = moment(dt).isoWeekday();
  let str = '';
  switch (dn) {
    case 1: { str = 'пн'; break;}
    case 2: { str = 'вт'; break;}
    case 3: { str = 'ср'; break;}
    case 4: { str = 'чт'; break;}
    case 5: { str = 'пт'; break;}
    case 6: { str = 'сб'; break;}
    case 7: { str = 'вс'; break;}
  }
  return str;
}


