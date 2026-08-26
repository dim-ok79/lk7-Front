import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-block-goy',
  imports: [],
  templateUrl: './block-goy.component.html',
  styleUrl: './block-goy.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class BlockGoyComponent {
  @Input() textMessage: string = 'СМОТРЕТЬ ВСЕ'; // Текст надписи
  @Input() url: string = ''; // URL

  constructor(private router: Router){

  }

  goyToUrl(){
    if (this.url.startsWith("http")){
      window.open(`${this.url}`, '_blank');
    } else {
      this.router.navigate([this.url])
    }
  }
}
