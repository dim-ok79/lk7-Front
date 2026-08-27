import { Component, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbdToastGlobal } from '../../../utils/toast/toast-global.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ITokenAndPatientId } from '../../../interfaces/patient.interface';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [NgbdToastGlobal],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
/*
Мой логин и пароль
ДДИ1275944
CTOEX4NEFI

Наталия
ДНА606694
MJF1R5QSAC
 */
  loading = false;      // Загрузка
  hidePassword = true;  // Показывать пароль
  thisTest = false; // Показывать подсказки при логировании
  frm = { username: '',  password: ''};

  @Output() onAuth = new EventEmitter<ITokenAndPatientId>();   // Событие Авторизация
  @Output() onError = new EventEmitter<string | null>();   // Ошибка


  constructor(
    private alert: NgbdToastGlobal,
    private auth: AuthService,
  ){
  }


  login(): void {
    console.log('this.frm=', this.frm);
    this.loading = true;

    this.auth.login$(this.frm.username, this.frm.password)
      .subscribe(
        (result: any) => {
          if (result.token && result.patientId) {
            this.onError.emit(null);
            this.onAuth.emit(result);
          } else {
            this.onError.emit('Чтото поло не так, попробуйте снова!');
          }
          this.loading = false;
        },
        (error: any) => {
          if (error.error && error.error.data && error.error.data.errorMsg) {
            //            this.errText = error.error.data.errorMsg;
            this.onError.emit(error.error.data.errorMsg);
          } else {
            this.onError.emit('Неверный логин или пароль');
          }
          ;
          this.loading = false;
        }
      )

  }


}
