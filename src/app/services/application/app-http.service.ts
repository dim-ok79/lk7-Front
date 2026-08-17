import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
//import {findValueCookie} from "../../components/application/global.function";
import {Router} from "@angular/router";
import {StoreService} from "./store.service";
import { ConfigService } from './config.service';
import { IHttpRequest } from '../../interfaces/httpRes.interface';

const cookieNameSession = 'cns';

@Injectable({
  providedIn: 'root'
})

export class AppHttpService {

  constructor(private http: HttpClient,
              private configS: ConfigService,
              private router: Router) {
  }

  public get(url: string, token: string | null): Observable<any> {
    let headerss = new HttpHeaders();
    if ((token) && (token.length > 10)) {
      headerss = headerss.set('Content-Type', 'application/json');
      headerss = headerss.set('Authorization', 'TOKEN ' + token);
    }

    return new Observable((observer) => {

      this.http.get(this.configS.getValue('hostBackend') + url, {headers: headerss})  // , withCredentials: false
        .subscribe(
          result => {
            const R: IHttpRequest = <IHttpRequest>result;
            if (R.success == true){
              observer.next(R.data);
            } else {
              observer.error(R.msg);
            }
            observer.complete();
          },
          err => {
console.log('err=', err);
            if ((!err.success && err.error && err.error.data && err.error.data.errorCode && err.error.data.errorCode === 'AuthenticationException') || (err.status === 401)) {
              if (location.pathname.indexOf('/login') === -1) {
                this.router.navigate(['/login'])
              }
//              StoreService.clearAllStore();
            }
            observer.error(err);
          }
        );
    })

//        return this.http.get(environment.host + url, {headers: headerss}).map((value: any) => {return value.data});
  }

  public put(url: string, data: {}, token: string | null): Observable<any> {
    let headerss = new HttpHeaders();
    if ((token) && (token.length > 10)) {
      headerss = headerss.set('Content-Type', 'application/json');
      headerss = headerss.set('Authorization', 'TOKEN ' + token);
    }
//        return this.http.get(environment.host + url, { headers: headerss }).pipe();
    return new Observable((observer) => {
//            this.http.get(environment.host + url, {headers: headerss})
      this.http.put(this.configS.getValue('hostBackend') + url, data, {headers: headerss})
        .subscribe(
          result => {
            const R: IHttpRequest = <IHttpRequest>result;
            observer.next(R.data);
            observer.complete();
          },
          err => {
            observer.error(err);
          }
        );
    })
  }

  public getALL(url: string, token: string | null): Observable<any> {
    let headerss = new HttpHeaders();
    if ((token) && (token.length > 10)) {
      headerss = headerss.set('Content-Type', 'application/json');
      headerss = headerss.set('Authorization', 'TOKEN ' + token);
    }

    return new Observable((observer) => {
      this.http.get(this.configS.getValue('hostBackend') + url, {headers: headerss}) // .map((value: any) => {return value.data});
        .subscribe(
          result => {
            observer.next(result);
            observer.complete();
          },
          err => {
            if (!err.success && err.error && err.error.data && err.error.data.errorCode && err.error.data.errorCode === 'AuthenticationException') {
//                            if (location.pathname !== '/login' ) {  // проверка на текущий УРЛ
              if (location.pathname.indexOf('/login') === -1) {
/* TODO: не понял для чего
                if (environment.production) {
                  location.href = this.configS.getValue('hostBackend') + '/login';
                } else {
                  this.router.navigate(['/login'])
                }
*/
                this.router.navigate(['/login'])

              }
            }
            observer.error(err);
          }
        );

    })
  }

  public getCORS(url: string): Observable<any> {
    let headerss = new HttpHeaders();
    headerss = headerss.set('Content-Type', 'application/json');

    return new Observable((observer) => {
      this.http.get( url, {headers: headerss}) // .map((value: any) => {return value.data});
        .subscribe(
          result => {
            observer.next(result);
            observer.complete();
          },
          err => {
            console.log('ERROR=', err);
            observer.error(err);
          }
        );

    })
  }


//    public post(url: string, data: {}, token: string | null, all: boolean | null = false, accessControlAllow: boolean | false): Observable<any> {
  public post(url: string, data: {} | null, token: string | null, all: boolean | null = false, isFile = false): Observable<any> {
    let headerss = new HttpHeaders();
    // Проверка на сессию
    /*
            if (document.cookie) {
              let sID = findValueCookie(document.cookie, cookieNameSession);
              if (sID) {
                headerss = headerss.set('cookies', cookieNameSession + '=' + sID);
              }
            }
    */
// console.log('headerss =', headerss);

    if ((token) && (token.length > 10)) {
      headerss = headerss.set('Content-Type', 'application/json');
      headerss = headerss.set('Authorization', 'TOKEN ' + token);
    }

    if (isFile) {
      headerss = headerss.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');
      headerss = headerss.set('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundaryfGdBgcxWfOFiEjot');
    }

    /*
            if (accessControlAllow) {
                headerss = headerss.set('Access-Control-Allow-Origin', '*');
                headerss = headerss.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                headerss = headerss.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Accept');
            }
    */
// console.log('TEST111');
    return new Observable((observer) => {
      /*
      console.log('TEST222');
      */

//          this.http.post(this.configS.getValue('hostBackend') + url, data , {headers: headerss, withCredentials: true})
      this.http.post(this.configS.getValue('hostBackend') + url, data , {headers: headerss, withCredentials: false})
        .subscribe(
          result => {
// console.log('result HTTP=', result);
// @ts-ignore
// console.log('result.headers =', result);
            const R: IHttpRequest = <IHttpRequest>result;
            if (all) {
              observer.next(R);
            } else {
              observer.next(R.data);
            }
            observer.complete();
          },
          err => {
            /*
            console.log('ERR HTTP=', err);
            */

            /*TomCat
                                    if ( url !== '/api/logout') {
            */
            if ((!err.success && err.error && err.error.data && err.error.data.errorCode && err.error.data.errorCode === 'AuthenticationException') || ((err.status === 401))) {
//                                if (location.pathname !== '/login' ) {  // проверка на текущий УРЛ
              if (location.pathname.indexOf('/login') === -1) {
/* TODO: не понятно
                if (environment.production) {
                  location.href = this.configS.getValue('hostBackend') + '/login';
                } else {
                  this.router.navigate(['/login'])
                }
*/
                this.router.navigate(['/login'])

              }
            }
            /*
                                    }
            */
            observer.error(err);
          }
        );

    });
  }

}
