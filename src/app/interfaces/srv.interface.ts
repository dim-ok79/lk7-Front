export interface ISrv {
 id: number,  // id услуги
 depId: number, // id филиала
 text: string,  // Наименование
 price: number, // цена
 isViewDesc: boolean, // показывать инфо или нет
 isTelemed: boolean, // услуга для телемед
 selected: boolean | null    // Выбрана или нет
}

export interface ISrvInfoParam {
 srvid: number,   // id услуги
 doctorid: number | null, // id доктора
 specid: number | null , // id специальность
 depid: number | null     // id филиала
}

