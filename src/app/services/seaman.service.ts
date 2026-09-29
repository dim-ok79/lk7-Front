import { inject, Injectable } from '@angular/core';
import { AppHttpService } from './application/app-http.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ISeamanCol } from '../interfaces/seaman.interface';

@Injectable({
  providedIn: 'root'
})
export class SeamanService {
  private httpApp = inject(AppHttpService);
  private authS = inject(AuthService);

  constructor() { }

  /**
   * Пациент является моряком
   * @param parameters
   */
  public get_Patient_is_Seaman(): Observable<ISeamanCol> {
    let url = '/seamen/patient';
    return this.httpApp.get(url , this.authS.token);
  }


}
