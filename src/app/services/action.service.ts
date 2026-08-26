import { Injectable } from '@angular/core';
import { IServ } from '../interfaces/record.interface';
import { Observable } from 'rxjs';
import { AppHttpService } from './application/app-http.service';
import { AuthService } from './auth.service';
import { IActionS } from '../interfaces/action.interface';

@Injectable({
  providedIn: 'root'
})

export class Action {

  constructor(private httpApp: AppHttpService, private auth: AuthService) { }

  /**
   * Получить список акций
   * @param parameters
   */
  public getActionList(): Observable<IActionS[]> {
    let url = '/action/list';
    return this.httpApp.get(url , this.auth.token);
  }

}
