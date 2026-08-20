export interface IMenu {
  id: number,      // Номер
  name: string,    // Название
  active: boolean, // Активная
  svgName: string,  // название картинки
  svgNameColor: string,  // название картинки цветной
  mobile_only: boolean;  // только в мобильном
  url?: string,     // Ссылка перехода
  img?: string     // Картинка
  submenu?: IMenu[];  // Под меню
}
