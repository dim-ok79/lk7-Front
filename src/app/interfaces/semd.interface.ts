export interface ISemd {
  code: string,    // название документа ENG
  text: string,    // название документа RU
  dat_str: string, // дата документа
  dat_date: Date,       // дата документа
  status: number,  // статус документа
  semd_id: number  // id для получения самого документа
}
