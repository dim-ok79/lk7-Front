export interface IRnumbList {
  beginDate?: Date; // дата и время начала приема;
  endDate?: Date;   // дата и время окончания приема
  addr: string;     // Адрес
  cab: string | null;
  calc_sum: number | null;
  dat_bgn: string;  // Дата начала - строка
  dat_end: string; // Дата окончания - строка
  depname: string;
  doctor_id: number;  //21376
  firstname: string;
  lastname: string;
  paystatus: number;
  phone: string;
  rnumb_id: number;
  secondname: string;
  spec: string;
  srv_text: string | null;
  is_telemed? : number;
  url_telemed? : string;
  lpu_id? : number;
  type_r: string;  // тип записи
}
