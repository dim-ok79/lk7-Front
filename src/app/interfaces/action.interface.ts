export interface IAction {
  info: string; // описание
  img: string; // ссылка на картинку
  url: string; // куда переходить
}

export interface IActionS {
  name: string; // Название
  block: string; // нименование для поиска
  allurl: string;  // Сылка на остальные акции
  list: IAction[];  // Список акций
}
