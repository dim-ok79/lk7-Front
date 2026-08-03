import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Импорт русской локали для moment.js
import 'moment/locale/ru';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lk7-front');

  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // логи
    this.iconRegistry.addSvgIcon('logInfo', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/info.svg'));
    // Договора
    this.iconRegistry.addSvgIcon('arrow_right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/auth/arrow_right.svg'));
    // Календарь
    this.iconRegistry.addSvgIcon('arrow_right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/auth/arrow_right.svg'));
    this.iconRegistry.addSvgIcon('date_range', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/date_range.svg'));
    this.iconRegistry.addSvgIcon('arrow_left_old', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/arrow_left.svg'));
    this.iconRegistry.addSvgIcon('arrow_right_old', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/arrow_right.svg'));

    this.iconRegistry.addSvgIcon('exit', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/exit.svg'));
    this.iconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/logo.svg'));
    this.iconRegistry.addSvgIcon('mail', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/mail.svg'));
    this.iconRegistry.addSvgIcon('phone', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/phone.svg'));
    this.iconRegistry.addSvgIcon('pdf', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/pdf.svg'));

    // Menu
    this.iconRegistry.addSvgIcon('recdoc', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/recdoc.svg'));
    this.iconRegistry.addSvgIcon('meddoc', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/meddoc.svg'));
    this.iconRegistry.addSvgIcon('fin', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/fin.svg'));
    this.iconRegistry.addSvgIcon('review', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/review.svg'));
    this.iconRegistry.addSvgIcon('info', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/info.svg'));


  }

}
