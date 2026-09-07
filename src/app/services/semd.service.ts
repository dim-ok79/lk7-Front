import { inject, Injectable } from '@angular/core';
import { AppHttpService } from './application/app-http.service';
import { AuthService } from './auth.service';
import { IRnumbList } from '../interfaces/rnumb.interface';
import { map } from 'rxjs/operators';
import { strToDate } from '../utils/global.function';
import { Observable } from 'rxjs';
import { ISemd } from '../interfaces/semd.interface';

@Injectable({
  providedIn: 'root'
})
export class SemdService {
  private httpApp = inject(AppHttpService);
  private auth = inject(AuthService);

  constructor() { }

  /**
   * Список СЭМД
   * @param parameters
   */
  public getSemdList(visitID: number): Observable<ISemd[]> {
    let url = '/semd/list';
    url = url + `?visitID=${visitID}`;
    return this.httpApp.get(url , this.auth.token).pipe(
      map((res: ISemd[]) => {
        res.forEach(item => item.dat_date = strToDate(item.dat_str))
        return res;
      })
    )
  }


}
