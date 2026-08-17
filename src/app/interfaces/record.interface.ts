export interface ISpec {
  keyid: number;  // id специальности
  text: string; // наименование
}

/* Услуги */
export interface IServ {
  keyid: number;  // id специальности
  text: string; // наименование (возможно - подмена)
  text_orig: string | null; // наименование оригинальное
  price: number;  // Цена
  is_online_pay: number | null;  // Обязательность к оплате
  is_telemed: number | null; // это телемедицина
}

/* Доктор */
export interface IDoctor {
  doctorid: number;
  l_name: string;
  f_name: string;
  s_name: string;
  srvlist?: IServ[];  // Список предоставляемых услуг
  adr?: string;      // Адрес ???
  rcount: number;   // Количество талонов
  dat_bgn: string;  // Временная строка из БД
  dat_end: string;  // Временная строка из БД
  specid?: number;   // ИД специальности по 2320 ВММЦ
  spec_name?: string; // Название специальности по 2320 ВММЦ
  rdatemin?: Date;  // Минимальная дата талона
  rdatemax?: Date;  // максимальная дата талона
  note?: string      // Описание
}

export interface IRecTalon{
  dat_begin_str: string; // "2021-10-05T11:30:00.000Z"
  dat_end_str: string; // "2021-10-05T12:00:00.000Z"
  depid: number;
  rnumbid: number;
  interval_id: number;  //
  is_interval: number;  // Интервальный номерок
  is_telemed: number;   // Номерок для телемедицины
  paystatus: number;    //
  is_online_pay: number; // Признак платной метки
  dtBegin?: Date;
  dtEnd?: Date;
  dtFilter?: number;  // дата для фильтра  Number(moment(dt).format('YYYYMMDD'))
  depname?: string;   // Наименование подразделения
  type_r?: string;    // Тип записи
}

export interface IRecTalonInit{
  talons: IRecTalon[];
  srv?: IServ;   // Выбранная услуга
}

/*
dat: "2021-10-05T11:30:00.000Z"
dat1: "2021-10-05T12:00:00.000Z"
depid: 1699
rnumb_id: 1050122419*/

export interface ICalendarData {
  periodStart: Date;
  periodEnd: Date;
  talonList: IRecTalon[];
}

export interface IStaticFilter {
  keyid: number;  // id фильтра
  text: string;   // Наименование
}

export interface IRnumbDate {
  doctorId: number;  // Доктор
  specId?: number;    // Специальность
  srvId?: number;    // Услуга
  periodStart: Date;  // Дата начала
  periodEnd: Date;    // Дата окончания
  staticFilterSelected?: IStaticFilter;  // выбраные фильтр
  srv?: IServ;        // Выбранная услуга
  spec?: ISpec;       // Выбранная специальность
  rectype?: number;   // Тип меток талонов
}

export interface IDep {
  keyid: number;
  text: string;
  gps_coordinates?: string;
  addr?: string // Адрес
}


export interface ITalonModal{
  rnumbID: number;     // ID номерка
/*
  isNewRec: boolean;   // Это новая запись
*/
  paramCansel?: boolean;  // Возможность отмены
  srv?: IServ;       // Выбранная услуга
}

export interface ITalonInfo {
  rnumb_id: number; // Ид талона
  dat_bgn: string; // дата и время начала приема;
  dat_end: string;   // дата и время окончания приема
  beginDate?: Date;
  endDate?: Date;
  cab: string | null; // номер кабинета;
  spec: string;    //  специальность врача
  srv_text: string | null;      // наименование услуги
  doctor_id: number;
  lastname: string;   //  фамилия врача;
  firstname: string;  // имя врача
  secondname: string; // отчество врача;
  depname: string | null;       // название филиала
  addr: string | null;          // адрес филиала;
  phone: string | null;            //  телефон филиала
  paystatus: number | null;        // платный талон (0 - бесплатный, 1 - платный)
  calc_sum: number | null;            // предварительная стоимость приема.
  is_telemed: number | null;         // Флаг телемед
  url_telemed: string | null;        // Ссылка на теле-конференцию
  lpu_id? : number;                 // ID ЛПУ
}

export interface ITalonResBlStatus {
  err_code: number;
  err_text: string;
}

export interface ITalonResAppointment {
  err_code: number;
  err_text: string;
  guid?: string;
}

export interface ITalonResAttrs {
  is_create_pay_order: number;
  is_create_srvs: number;
  is_online_pay: number;
  is_telemed: number;
}

export interface IResRecord {
  recTalon: boolean;  // Записан на талон?
  payOnline: boolean; // Оплата ОНЛАЙН
  payClinic: boolean; // Оплата в клинике
}

export interface ITalonResCPbyR {
  err_code: number;
  err_text: string;
  paymentid?: number;
}

export interface ITalonResPaymentTemp {
  err_code: number;
  err_text: string;
  identity?: number;
}

export interface ITalonResCansel {
  err_code: number;
  err_text: string;
  guid?: number;
}

export interface ITalonsDaySetParams{
  dt: Date;
  dep?: IDep;   // Выбрано подразделение
}
