
export interface ICalendar {
  month_begin: number;
  year_begin: number;
  date: ICalendarDateActive[];
}

export interface ICalendarDate {
  data: Date;
  day: number;
  isCourrentMonth: boolean; // тип даты (0- не в этом месяце, 1 - в текущем месяце)
  isAction: boolean; // Активный день
  isSelected: boolean; // Выбранный день
  isCourrentDay: boolean; // Текущий день
}

export interface ICalendarHeader {
  mount: string;
  year: string;
}

export interface ICalendarDateActive {
  date: number; // дата в формате YYYYMMDD (dt.push({date: Number(moment(item.dtSort).format('YYYYMMDD'))});)
}

export interface IdaySlice {
  begin: number;
  end: number;
}

export interface ICalendarInit {
  mounth_begin: number;  // Стартовый месяц
  year_begin: number;    // Стартовый год
  count: number; // Кол во календарей
  cdActive: ICalendarDateActive[];  // Активные дни
  orderByStart: boolean;  // месяци с верху в низ
  MaxDate?: IMY;  // не более этого месяца
  MinDate?: IMY;  // не меньше этого месяца
  selectDate: string; // Выбранная дата
}

export interface IMY {
  m: number;  // Месяц
  y: number;  // Год
}

