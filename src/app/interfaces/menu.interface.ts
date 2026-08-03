export interface IMenu {
  id: number,      // Номер
  name: string,    // Название
  active: boolean, // Активная
  svgName?:string,  // название картинки
  url?: string,     // Ссылка перехода
  img?: string     // Картинка
  submenu?: IMenu[];  // Под меню
}
