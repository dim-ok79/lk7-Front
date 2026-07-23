export interface IPatient {
  patientId: number;      // ID пациента
  num: string;     // Номер медицинской карты
  lastname: string;       // Фамилия
  firstname: string;      // Имя
  secondname: string;     // Отчество
  birthdatestr: string;      // Дата рождения
  birthdate: Date | null;      // Дата рождения
  phone: string;          // Телефон
  cellular: string;       // Сотовый телефон
  email: string;          // Почта
  address_proj: string;    // Адрес проживания
  snils: string;       // СНИЛС ИНН
  count_login: number  // количество логинов
  sex: number  // Пол 0-Мужчина, 1- Женщина
  age: string  // Сколько лет
}

// Параметры пациента
export interface IPatientExt {
  name: string;   // Наименование
  value: string;  // Значение
}

export interface ITokenAndPatientId {
  token: string;
  patientId: number;
  ext?: IPatientExt[];   // список параметров по пациенту
}

/* Список договоров */
export interface IDogList {
  id: number;        // ID
  text: string;    // наименование
  Сh: boolean | null;     // отмечена
  Url: string | null;     // url для перехода
}

export interface IDogListForSig {
  template_id: number;
  template_name: string;
  Сh: boolean | null;     // отмечена
  url: string | null;     // url для перехода
}

export interface IIDogSignatureData {
  id: number; // ID документа
}

export interface IDogSignatureRes {
  err_code: number;
  err_text: string;
  id?: number;
}

/* Документ у пациента */
export interface IContract {
  id: number; // ID
  date: string; // Датат документа
  text: string; // Наименование
}

/* Создание пациента */
export interface ICreatePatient {
  lastName: string;   // Фамилия
  firstName: string;  // Имя
  secondName: string; // Отчетсво
  birthDate: string;  // ДР Формат даты = "01.12.1999"
  email: string;      // Почта
  phone: string;      // Телефон
  sex: number;       // Пол ()
  snils: string;     // СНИЛС
  inn: string;       // ИНН
  iin: string;       // ИИН (для Казахстана)
  card: number;      // номер карты пациента
  tabNum: string;    // табельный номер из мест работы
  polisNum: string;  // номер полиса
  polisSer: string;  // серия полиса
}

export class IUser {
  token?: string | null;
  patientId?: number | null;
}

export interface IInetuserLog {
  id: number; // Иденьтификатор INT
  dat_str: string; // дата строковое "dd.mm.yyyy HH24:MI"
  date: Date; // "dd.mm.yyyy HH24:MI"
  action: string;  // Наименование активности ("AUTH")
  text: string;    // Текст
  browser: string;  // Браузер
  ip_address: string; // IP адрес
  os: string;  // OS
  logLevel: number; //
  session_id: string;
  success: number; // 1-нормально
}

export interface IInetuserLogSize {
  size: number; // Количество
}



export interface IStatementParam {
  code: string;
  name: string;
  default_value: string;
  required: number;
  validate: string;
}

/* Найденный пациент */
export interface IAuthPatients {
  patient_id: number;
  fio_1: string;
  fio_2: string;
  count_dog?: number; // Кол договоров на подпись
  ear?: string;  // Сколько лет
}

// Семья
export interface IFamily {
  typerod: string;         // тип родства
  prel_lastname: string;   // Фамилия
  prel_firstname: string;  // Имя
  prel_secondname: string; // Отчество
  prel_ptientid: number;   // id пациента
  prel_toekn: string;      // токен
}

export interface IPolice {
  agrid: number;
  finanse_type: string; // Тип - ОМС ДМС ...
  police_info: string; // "Серия: ЕП, номер : 7848600820000519 "
  police_info2: string; //"9.788.71 СК \"СОГАЗ-Мед\" СПб ЕП 7848600820000519"
  policeid: number; // 1417994
  typ: string; // Шифр полиса "9.788.71"
}
