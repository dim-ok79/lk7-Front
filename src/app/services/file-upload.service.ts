import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {HttpClient, HttpEvent,  HttpHeaders, HttpRequest} from "@angular/common/http";
import {IdocType, IDocuments, IFileListRnumb} from "../interfaces/document.interface";
import { ConfigService } from './application/config.service';
import { AppHttpService } from './application/app-http.service';
import { map } from 'rxjs/operators';
import { strToDate } from '../utils/global.function';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private configS: ConfigService,
    private httpApp: AppHttpService
  ) {
  }


  upload(file: File, typeDoc: string): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    let headerss = new HttpHeaders();
    if ((token) && (token.length > 10)) {
      headerss = headerss.set('Authorization', 'TOKEN ' + token);
    }

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('type_doc', typeDoc);
    const req = new HttpRequest('POST', `${this.configS.getValue('hostBackend')}/file_upload/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: headerss
    });
    return this.http.request(req);
  }

/*
  uploadTmp(file: File): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    let headerss = new HttpHeaders();
    if ((token) && (token.length > 10)) {
      headerss = headerss.set('Authorization', 'TOKEN ' + token);
    }

    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.configS.getValue('hostBackend')}/file_upload/temp`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: headerss
    });
    return this.http.request(req);
  }
*/


  uploadTC(file: File, typeDoc: string, linkId: string): Promise<any> {
    return new Promise((ress, rej) => {
      const token = this.auth.token;
      let headerss = new HttpHeaders();
      if ((token) && (token.length > 10)) {
        headerss = headerss.set('Authorization', 'TOKEN ' + token);
      }
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('type_doc', typeDoc);
      formData.append('link_id', linkId);
      const upload$ = this.http.post(`${this.configS.getValue('hostBackend')}/file_upload/upload_tc`, formData, {
        reportProgress: true,
        responseType: 'json',
        headers: headerss
      });

      upload$
        .subscribe(
        result => {
          ress(result);
        },
        err => {
          rej(err);
        });
});
}

  uploadTmp(file: File): Promise<any> {
    return new Promise((ress, rej) => {
      const token = this.auth.token;
      let headerss = new HttpHeaders();
      if ((token) && (token.length > 10)) {
        headerss = headerss.set('Authorization', 'TOKEN ' + token);
      }
//       console.log('start  load fiel-1');
      const formData: FormData = new FormData();
      formData.append('file', file);
//
//      console.log('start  HTTP fiel-', file.name);
      const upload$ = this.http.post(`${this.configS.getValue('hostBackend')}/file_upload/temp`, formData, {
        reportProgress: true,
        responseType: 'json',
        headers: headerss
      });

      upload$
        .subscribe(
        result => {
//          console.log(`R result ${file.name}=`, result);
          ress(result);
        },
        err => {
          rej(err);
        });


//
/*  Работае но для вывода процентов
      const req = new HttpRequest('POST', `${this.configS.getValue('hostBackend')}/file_upload/temp`, formData, {
        reportProgress: true,
        responseType: 'json',
        headers: headerss
      });
      console.log('start  HTTP fiel-', file.name);
      this.http.request(req)
        .subscribe(
        result => {
console.log(`R result ${file.name}=`, result);
          ress(result);
        },
        err => {
          rej(err);
        });
*/

    });
  }

  getDocTypeList(): Observable<IdocType[]> {
    const url = '/file_upload/list_type';
    return this.httpApp.get(url, this.auth.token);
  }

  getDocList(): Observable<IDocuments[]> {
    const url = '/file_upload/list_doc';
    return this.httpApp.get(url, this.auth.token).pipe(
      map((res: IDocuments[]) => {
        res.forEach(item => item.dat = strToDate(item.dat_str))
        return res;
      })
    )
  }

  getDocListForRnumb(rnumbId: string): Observable<IFileListRnumb[]> {
    const url = '/file_upload/list_doc_rnumb/'+rnumbId;
    return this.httpApp.get(url, this.auth.token);
  }

  mailToSend(dt: any): Observable<any[]> {
    const url = '/mails/send';
    return this.httpApp.post(url, dt, this.auth.token, true);
  }

}
