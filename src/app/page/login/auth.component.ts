import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
 import { Size } from '../../services/size';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/auth/login/login.component';
import { EsiaComponent } from '../../components/auth/esia/esia.component';
import { NgbdToastGlobal } from '../../utils/toast/toast-global.component';
import { ITokenAndPatientId } from '../../interfaces/patient.interface';
import { PatientAttachedService } from '../../services/patient_attached.service';
import { PatientService } from '../../services/patient.service';
import { AuthService } from '../../services/auth.service';
import { DogListComponent } from '../../components/auth/dog-list/dog-list.component';
import { Router } from '@angular/router';

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
                private auth: AuthService,
                private router: Router,
    ){
//      super();
    }

  ngOnInit(): void {
      console.log('Auth INIT =');
/* Тест документов подписания */

/*
      let tmp: ITokenAndPatientId = {
        patientId : 1925388,
        token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50X2lkIjoxOTI1Mzg4LCJzb2xpZCI6IndlMjszNC0wZGZzdm9raW9uc2RmMnczMml1IiwiaWF0IjoxNzg0NjIwNzk3LCJleHAiOjE3ODQ2NDIzOTd9.7q8faCtbFj1_7E4dunsteYpqHIMSpBp1ByU66-hZOcQ",
        ext : [{name: "WEB_LK_MODULES0", value: "to-doctor,h-doctor,history,services"}]
      };
      this.authModule(tmp);
*/


  }

  ngAfterViewInit() {
      // Установка типа девайса
        this.size.setW(this.contentBlocAuthEL?.nativeElement.offsetWidth);
  };

    // Обработка получение токена
  authModule(resModule: ITokenAndPatientId | null){
    console.log('authModule resModule=', resModule);
    this.tmpToken = resModule;

    // После подписания документов - работаем
    if (this.curentModule == 'dog-list') {
      this.loginOK();
    }

    if (this.curentModule == 'login' || this.curentModule == 'esia') {
      this.curentModule = 'dog-list';
    }

  }

  public loginOK(): void {
    this.auth.loginOk$(this.tmpToken!.token, this.tmpToken!.patientId, this.tmpToken!.ext!);
    this.router.navigate(['/'])
  }

  // Обработка ошибки
  errorModule(event: string| null) {
    this.errText = event;
  }


}
