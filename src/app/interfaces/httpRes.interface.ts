export interface IHttpRes {
  code: number;
  text: string;
  id?: number;
}

export interface IHttpRequest {
  success: boolean;  // true запрос выполнен успешно
  data: any;         // Данные результата
  msg: string | null; // Сообщение для пользователя об ошибке
}

