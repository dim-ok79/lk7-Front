export interface ICity {
  id: number,  // id города
  active: boolean;  // Активный по шифру в БД
  selected: boolean; // Выбранный в ручную
  name: string // Наименование города
}

export interface ICityBE {
  city_code: number;
  city_name: string;
}
