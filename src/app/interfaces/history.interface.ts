export interface ILabSize {
  size: number; // Количество
}

export interface IHistoryEvents {
  dat: string;
  dtSort: Date; // Для сортировки
  doctor: string;
  keyid: number
  typetext: string; // Наименование
  typehistory: string; // Тип
  sortcode: number;
  doctorid: number; //id для картинки
  spec: string;
  specid: number; // id специальности
  dep_name: string;  // Отделение
  sched_exists_for_dd_on_visit: number;  // 1-Возможна запись ОНЛАЙН
  count_files : number;     // Количество подписанных документов СЭМД
}

export interface IHistoryEventList {
  type: string;
  id: number;
  date: Date;
  doctor: string;
  spec: string;
  researchType: string;
}

export interface IHistoryItemHtmlList {
  text: string;
  row_num: number;
}

export interface IRegistrationData {
  calcStatusText: string;
  doctor: IRegistrationDoctor;
  place: string;
  fullDate: Date;
  target: IRegistrationTarget;
  caseInfo: IRegistrationCaseInfo;
  mainDiagnos: IRegistrationMainDiagnos;
  complDiagnosis: string;
  disabilityText: string;
  secondDiagnos: string;
}

interface IRegistrationDoctor {
  name: string;
  spec: string;
}

interface IRegistrationTarget {
  visType: number;
  visName: string;
}

interface IRegistrationCaseInfo {
  caseText: string;
  caseType: string;
  caseResult: string;
}

interface IRegistrationMainDiagnos {
  mkbCode: string;
  mkbText: string;
  illType: string;
  disp: string;
  travma: string;
  worse: string;
  stage: number;
  crime: string;
}

export interface IProtocolListTable {
  type: string;
  value: string;
}

export interface IProtocolList {
  type: string;
  question: string;
  answer: string;
  bgcolor: string;
  rows: Array<IProtocolListTable>;
}
export interface IHistoryProtocol {
  id: number;
  formId: number;
  date: Date;
  header: string;
  listData: Array<IProtocolList>;
}

export class IHistoryVisit {
  /*
    type: string;
    id: number;
    date: Date;
    regInfo: IRegistrationData;
    protocols: Array<IHistoryProtocol>;
    descriptionVisits: string;
  */
}

export interface IDiagDoctor {
  post: string;
  doctor: string;
}

export interface IHistoryDiag {
  type: string;
  id: number;
  date: Date;
  researchType: string;
  type1: string;
  type2: string;
  type3: string;
  type4: string;
  doctors: Array<IDiagDoctor>;
  results: string;
  protocols: Array<IHistoryProtocol>;
}

export interface IHistoryEventFiles {
  id: number;  // id файла
  datstr: string; // Дата файла
  dat: Date;      // Дата
  text: string; // Наименование
  typerec: string; // Тип записи
}
