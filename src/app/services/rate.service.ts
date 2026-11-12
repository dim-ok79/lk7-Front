import { inject, Injectable } from '@angular/core';
import { AppHttpService } from './application/app-http.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private httpApp = inject(AppHttpService);
  private authS = inject(AuthService);

  constructor() { }

  /**
   * Пациент является моряком
   * @param parameters
   */
  public add_rate(p_visit_keyid: number, p_doctorid: number, p_specid: number, p_typehistory: string, p_rate_count: number, p_rate_text: string | null = null): Observable<any> {
    let url = '/rate/add';
    return this.httpApp.post(url , {
      visit_keyid: p_visit_keyid,
      doctorid: p_doctorid,
      specid: p_specid,
      typehistory: p_typehistory,
      rate_count: p_rate_count,
      rate_text: p_rate_text
    }, this.authS.token, true);
  }

}
