export interface IdocType {
  keyid:number;
  text: string;
}

export interface IDocuments {
  id:number;
  dat_str: string;
  dat?: Date;
  text: string;
  file_name: string;
}

export interface IFileList {
  control_name: string,
  file?: FileList,
  filename?: string;
  fileBK?: string // файл на бэке
}

export interface IFileListRnumb {
  id: number;
  name: string;  // Наименование
  dat_str: string;
  dat?: Date;
}

// Для отправки почты
/*
export interface IMailSend {
  birthDate?: string;
  email?: string;
  file?: IFileList[];
  firstName?: string;
  lastName?: string;
  note?: string;
  phone?: string
  secondName?: string
}
*/

