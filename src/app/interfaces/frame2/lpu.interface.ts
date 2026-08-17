
export interface Icity {
  id: number;
  name: string;
}

export interface Ilpu {
  id: number | null;
  city_id: number;
  addres: string;
  name: string;
  orderby: number;  // сортировка
  ispatient: number;  // Пациент приписан
}

export interface ISpec {
  keyid: number;
  text: string;
}


export interface Isrvlist {
  code: string;
  is_online_pay : number;
  is_telemed: number;
  keyid: number;
  price: number;
  text: string;
}

export interface IDoc {
  doctorid : number;
  dat_bgn :string;
  dat_end : string;
  f_name : string;
  l_name : string;
  s_name :string;
  note : string;
  rcount : number;
  srvlist : Isrvlist[];
  dolgnost: string;
  isFilter: number;
}

export interface IDocURL {
  url: string;
}

export interface IDocAll {
  doctorid: number;
  l_name: string;
  f_name: string;
  s_name: string;
  specid: number;
  fio?: string;
  specName?: string;
}
