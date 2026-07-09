import {Injectable} from '@angular/core';

/*
Сервис по работе с локальным хранилищем
 */

@Injectable()
export class StoreService {

  private static _appKey = 'pa-web';  // Префикс для каждого проекта свой

  /**
   * Добавить объект в локальное хранилище
   * @param key
   * @param {object} obj
   */
  public static setData(key: string, obj: object): void {
    localStorage.setItem(this._appKey + '_' + key, JSON.stringify(obj));
  }

  /**
   * Получить объект из локального хранилища
   * @returns {object}
   */
  public static getData(key: string): object {
    const item = localStorage.getItem(this._appKey + '_' + key);
    if (item) {
      return JSON.parse(item);
    } else {
      return {};
    }
  }

  /**
   * Удалить данные по ключу
   */
  public static deleteStoreNameKey(key: string): void {
    localStorage.removeItem(this._appKey + '_' + key);
  }

  /**
   * Полная очистка локального хранилища
   */
  public static clearAllStore(): void {
    const WEB_LK_DEVICE_TYPE = this.getData('WEB_LK_DEVICE_TYPE');
    localStorage.clear();
    this.setData('WEB_LK_DEVICE_TYPE', WEB_LK_DEVICE_TYPE);
  }
}
