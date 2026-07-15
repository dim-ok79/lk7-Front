import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
 import { Size } from '../../services/size';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { EsiaComponent } from './esia/esia.component';
import { NgbdToastGlobal } from '../../utils/toast/toast-global.component';
import { ITokenAndPatientId } from '../../interfaces/patient.interface';
import { PatientAttachedService } from '../../services/patient_attached.service';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { DogListComponent } from './dog-list/dog-list.component';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, NgbdToastGlobal, EsiaComponent, LoginComponent, DogListComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [Size, PatientService, PatientAttachedService, AuthService],
  encapsulation: ViewEncapsulation.None
})

//export class AuthComponent extends BaseComponet implements OnInit, AfterViewInit {
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild('ContentBlocAuth') contentBlocAuthEL: ElementRef|undefined;

  tmpToken: ITokenAndPatientId | null = null;
  curentModule: string = 'login'; // login esia dog-list

  AuthFormText = 'Личный кабинет';  //
  errText : string | null = null;

    constructor(private size: Size,
                private paS: PatientAttachedService,

    ){
//      super();
    }

  ngOnInit(): void {
      console.log('Auth INIT =');
/* Тест документов подписания */
      let tmp: ITokenAndPatientId = {
        patientId : 1925388,
        token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50X2lkIjoxOTI1Mzg4LCJzb2xpZCI6IndlMjszNC0wZGZzdm9raW9uc2RmMnczMml1IiwiaWF0IjoxNzg0MTAxOTU5LCJleHAiOjE3ODQxMjM1NTl9.-_y4rUas-wcnx-HGZXBcc9CKZeOtzVIgDFgdOVTCfWk",
        ext : [{name: "WEB_LK_MODULES0", value: "to-doctor,h-doctor,history,services"}]
      };
      this.authModule(tmp);

  }

  ngAfterViewInit() {
      // Установка типа девайса
        this.size.setW(this.contentBlocAuthEL?.nativeElement.offsetWidth);
  };

    // Обработка получение токена
  authModule(resModule: ITokenAndPatientId){
    console.log('authModule resModule=', resModule);
    this.tmpToken = resModule;
    this.curentModule = 'dog-list';
/*
    this.paS.loadServer(this.tmpToken.token)
      .subscribe(res=>{
        console.log('paS.loadServer res=', res);
/!*
          if (res.ext){
            // @ts-ignore
            this.tmpToken.ext = res.ext;
          }
*!/
//                  this.showDoglist = true;
        },
        err=>{
          console.log('paS.loadServer err=', err);
/!*
          if (res.ext){
            // @ts-ignore
            this.tmpToken.ext = res.ext;
          }
*!/
//                  this.showDoglist = true;

        });
//            this.loginDoc(result.token);
*/

  }

  // Обработка ошибки
  errorModule(event: string) {
    this.errText = event;
  }


}
