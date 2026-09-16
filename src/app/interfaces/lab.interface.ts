export interface ILabOrder {
  dtSort: Date;                      // Для сортировки
  research_id: number;
  orderid: number;
  regdate: string;
  status: string;
  text_status: string;
  material_id?: number;
  ids?: string;
  specimen?: string;
  material_finishdate?: string;
  material_status?: string;
  text_material_status?: string;
  rnum: number;                       // Порядковый номер
}

export interface ILabSize {
  size: number; // Количество
}

export interface ILabResearch {
  id: number;
  abio_bactery_sortcode: string | null;
  abio_bactery_text: string | null;
  abio_conclusion: string | null;
  abio_koe: string | null;
  abio_note: string | null;
  data_last_res: string | null;
  ids: string | null;
  last_res: string | null;
  norm: string | null;
  norm_max: string | null;
  norm_min: string | null;
  norm_note: string | null;
  order_num: string | null;
  pat_level: string | null;
  regdate: string | null;
  res_antibiotic_text: string | null;
  res_bactery_text: string | null;
  res_dia: string | null;
  res_display_order: string | null;
  res_mic: string | null;
  res_sir: string | null;
  res_sortcode: string | null;
  specimen_text: string | null;
  srvtext: string | null;
  test_name: string | null;
  title: string | null;
  title_id: string | null;
  unit: string | null;
  value: string | null;
  value_note: string | null;
}

export interface IBactery {
  name: string;
  sir: string;
  mic: string;
  dia: string;
}

export interface IPakaz {
  name: string |null;
  val: number | null; // Текущий
  valEd: string | null;  // Ед изм.
  last_res: number | null;  // Предыдущие показ
  min: number | null;
  max: number | null;
  patLevel: string | null;  // Уровень для картинки
  norm: string | null;      // Текст нормы
}

export interface IResearchFormBio {
  name: string | null;
  bactery: IBactery[] | null;
}

export interface IResearchForm {
  name: string | null; // Наименование микроорганизма
  listResult: IPakaz[];
}

export interface ILabResearchForm {
  name: string | null;
  formBio: boolean;  // Форма BIO?
  ids: string | null;
  id: number | null; // id
  res: IResearchFormBio[] | IResearchForm[] | null;
  srvText?: string | null; // Услуги для БИО
  srvRes?: string | null;  // Результаты услуг для БИО
  note?: string | null;   // Заключение для БИО
}
