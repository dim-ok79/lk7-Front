export interface IRnumb {
  dat_begin_str : string; // Дата начала
  dat_end_str : string; // Дата окончания
  depid : number;
  depname : string;
  interval_id : number;
  is_interval : number;
  is_online_pay : number;
  is_telemed : number;
  paystatus : number;
  rnumbid : number;
  stacid : number;
  lpu_id : number;
  dat? : Date; // Дата
}

/* Для вывода информации на панели*/

export interface IRnumbInfo {
  dt : Date; // Дата начала
  time_str : string; // Время
  rnumbid : number;
}

export interface IRnumbToDateArray {
  dt : Date; // Дата начала
  active : boolean;  // Активный
  rnumbInfo: IRnumb[]
}
