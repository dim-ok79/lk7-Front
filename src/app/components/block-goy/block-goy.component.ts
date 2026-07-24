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
      this.router.navigate([this.url])
  }
}
