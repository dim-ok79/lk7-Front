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
    this.iconRegistry.addSvgIcon('fin', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/fin.svg'));
    this.iconRegistry.addSvgIcon('fin_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/fin_color.svg'));
    this.iconRegistry.addSvgIcon('medcard', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/medcard.svg'));
    this.iconRegistry.addSvgIcon('medcard_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/medcard_color.svg'));
    this.iconRegistry.addSvgIcon('myrec', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/myrec.svg'));
    this.iconRegistry.addSvgIcon('myrec_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/myrec_color.svg'));
    this.iconRegistry.addSvgIcon('rec', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/rec.svg'));
    this.iconRegistry.addSvgIcon('rec_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/rec_color.svg'));
    this.iconRegistry.addSvgIcon('action_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/action_color.svg'));
    this.iconRegistry.addSvgIcon('exit_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/exit_color.svg'));
    this.iconRegistry.addSvgIcon('info_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/info_color.svg'));
    this.iconRegistry.addSvgIcon('myprofil_color', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/menu/myprofil_color.svg'));

    this.iconRegistry.addSvgIcon('location', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/location.svg'));

    this.iconRegistry.addSvgIcon('calendar', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/calendar.svg'));
/* talon */
    this.iconRegistry.addSvgIcon('krest', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/talon/krest.svg'));
    this.iconRegistry.addSvgIcon('calendar', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/talon/calendar.svg'));
    this.iconRegistry.addSvgIcon('geo', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/talon/geo.svg'));
    this.iconRegistry.addSvgIcon('price', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/talon/price.svg'));
    this.iconRegistry.addSvgIcon('time', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/talon/time.svg'));

    this.iconRegistry.addSvgIcon('upload', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/upload.svg'));


  }

}
