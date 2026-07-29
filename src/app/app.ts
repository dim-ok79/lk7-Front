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
    this.iconRegistry.addSvgIcon('logInfo', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/account/logInfo.svg'));
    // Договора
    this.iconRegistry.addSvgIcon('arrow_right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/auth/arrow_right.svg'));
    // Календарь
    this.iconRegistry.addSvgIcon('arrow_right', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/auth/arrow_right.svg'));
    this.iconRegistry.addSvgIcon('date_range', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/date_range.svg'));
    this.iconRegistry.addSvgIcon('arrow_left_old', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/arrow_left.svg'));
    this.iconRegistry.addSvgIcon('arrow_right_old', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/svg/arrow_right.svg'));

  }

}
