
export interface IPayment {
  dtSort: Date;    // Полная дата
  img_pt: string ;      // код картинки
  pay_type: string;   // тип платежа
  pt_dat_str: string;  // Дата платежа
  pt_dat?: Date;  // Дата платежа
  all_amount: number | null; // всего к оплате
  pay_nal: number; // оплачено за нал
  pay_card: number; // оплата по карте
  pay_from_avans: number | null; // оплата в счет аванса
  lpu_name: string; // Название ЛПУ
  paymentId: number;  // id платежа
  pt_keyid: number;   // id платежа !!
  paystatus: number | null; // Статус оплаченности: 1 - оплачен, 0 - не оплачен /
  services: IServicePayment[];
  confirmation_url: string | null; // УРЛ для оплаты
  ffd_url?: string;  // URL для перехода на фискальный чек
}

export interface IServicePayment {
  name: string;
  doc_id: number;
  doc: string;        // доктор
  spec_name: string;  // специальность
  dtstr: string | null;  // Дата услуги - строка
  dt: Date | null;  // Дата услуги
  price: number | null;  // Цена услуги
}

/*
+all_amount: 565.54
+confirmation_url: null
+img_pt: "IMG_PT_NAL"
+lpu_name: null
patkeyid: 384551420
+pay_card: 565.54
+pay_from_avans: null
+pay_nal: 0
+pay_type: "Отложенный Платеж"
+paystatus: 0
+pt_dat: "2021-07-20T09:04:00.000Z"
pt_keyid: 27887950
*/


export interface IPaymentInfo {
  patServId: number; // ссылка на услугу пациента
  psDate: string; // дата услуги
  srvDepId: number; // ссыдка на услугу из прайса
  sdCode: string; // код услуги из прайса
  sdName: string; // название услуги
  psQty: number; // кол-во услуг
  psPrice: number; // цена услуги по прайсу
  discount: number; // размер скидки
  psAmount: number; // сумма к оплате за услугу
  psDocExec: string | null; // выполнивший врач
  status: string; // статус услуги выполнена/отменена/заведена
  place: string; // местположение услуги
  typOpl: string | null; // ТИП ОПЛАТЫ УСЛУГИ НАЛ/ДМС/ГП/АБОЕНЕМНТ и прочее
  doctorId: number | null; // Врач с врача на отделении. Используется для определения главной записи Врача
  docExecId: number | null; // ссылка на выполнившего врача на отделении
  docSpecId: number | null; // специальность врача
  historyEvents: string | null; // тип события для услуги
  historyEventsId: number; // ссылка на id сущности из типа события для услуги
}

export interface IRnumbInfoByPayment {
  text: string;
  value: string;
}

export interface IPayFormData {
  paymentId: number;  // ID платежа
  amount: number; // Сумма платежа
  paySystemInfo: IPaySystemInfo; // Платежные системы
  mail: string | null;
  phone: string | null;
}

export interface IPaySystem {
  code: string; // Тип платежной системы "YANDEX"
  requiredFieldCodes: string []; // Возможные типы авторизации ("email_or_phone")_
  isEmail?: boolean;
  isPhone?: boolean;
}

export interface IPaySystemInfo {
  paySystems: IPaySystem[];
}

/*
export class IPay{
  constructor(public sum: number | null,
              public phone: string | null,
              public email: string | null,
              public abon_id: number | null)
  { }
}
*/

export interface IPay {
  sum: number | null;
  phone: string | null;
  email: string | null;
  abon_id: number | null;
}
