import {IRecTalon} from "./record.interface";

export interface IDateRange {
  str_begin?: string;
  str_end?: string;
  dt_begin: Date | null;
  dt_end: Date | null;
}

export interface ICalendarDateItem {
  data: Date;
  day: number;
  isCurrentMonth: boolean; // тип даты (false- не в этом месяце, true - в текущем месяце)
  isStartDAY: boolean; // Периуд С
  isEndDay: boolean; // Периуд По
  isStartInserted: boolean; // Выбранный в промежутке
  isCurrentDay?: boolean; // Текущий день
}

export interface IDateRangeCalendarData {
  curentDate: Date;  // Текущий месяц
  prefix: String;    // Префикс календаря для разделения событий
  startDate: Date | null;  // Дата начала
  endDate: Date | null;    // Дата окончания
}

export interface IDateRangeHeader {
  mount: string;
  year: number;
  dt: Date;
  left: boolean; // доступ на лево
  right: boolean; // доступ на право
  prefix: string; // префикс календаря
}

export interface ImonthList {
  id: number;
  name: string;
};




