export interface ILabsList {
  research_id: number;
  specimen_text: string;
  srvtext: string;
  regdate_str: string;
  regdate: string;  // не смотреть
  order_num: number;
  regdate_date?: Date;
}

  /* Старые */

export interface ILaboratoryServices {
  id: number;
  code: string;
  name: string;
  qty: number;
  price: number;
  discount: number;
  sum: number;
  materials: IMaterialServices[];
}

interface IMaterialServices {
  materialId: number;
  materialName: string;
  collectPlace: string;
  ids: number;
  services: IServicesMaterials[];
}

interface IServicesMaterials {
  id: number;
  code: string;
  name: string;
  payer: IPayer;
  qty: number;
  price: number;
  discount: number;
  sum: number;
}

interface IPayer {
  payer: string;
  payer2: string;
}

export interface IResearchFileList {
  id: number;
  file_name: string;
  fileName: string; // удалить
  file_type: string;
  content_type: string;
  researchId: number; // id заказа
}

export interface ILaboratoryExt {
  text: string;  // Наименование параметра
  value: string; // Значение параметра
}
