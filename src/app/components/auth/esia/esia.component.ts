import { Component, ViewEncapsulation } from '@angular/core';
import { NgbdToastGlobal } from '../../../utils/toast/toast-global.component';

@Component({
  selector: 'app-esia',
  imports: [],
  templateUrl: './esia.component.html',
  styleUrl: './esia.component.scss',
  providers: [NgbdToastGlobal],
  encapsulation: ViewEncapsulation.None

})
/* TODO: добавить NgbdToastGlobal из frame2
*/

export class EsiaComponent {
  loading = false;      // Загрузка
  public esia_link: string | null = null; // доступность кнопки Авторизациии через ГосУслуги

  constructor(private alert: NgbdToastGlobal){}

  loginEsia(): void {
    /*
        this.alertService.error('Внимание! В настоящий момент на сайте ведутся технические работы, вход в Личный кабинет через Госуслуги затруднен. Для записи на прием к врачу просьба воспользоваться телефоном +7 (812) 363-11-22.', 9000)
        this.loading = true;
        setTimeout(()=> this.loading = false, 9000);
    */
    this.loading = true;
console.log('00 this.esia_link=', this.esia_link);
    this.alert.danger('Тестт');
    this.loading = false;
/*
    if (this.esia_link) {
      window.location.href = this.esia_link;
    } else {
      this.toast.danger('Внимание! В настоящий момент вход в Личный кабинет через Госуслуги затруднен. Для записи на прием к врачу просьба воспользоваться телефоном +7 (812) 363-11-22.');
//      this.alertService.error('Внимание! В настоящий момент вход в Личный кабинет через Госуслуги затруднен. Для записи на прием к врачу просьба воспользоваться телефоном +7 (812) 363-11-22.', 9000)
      this.loading = false;
    }
*/
  }


}
