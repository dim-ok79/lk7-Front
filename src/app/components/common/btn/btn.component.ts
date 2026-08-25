import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn',
  imports: [CommonModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class BtnComponent {
  @Input() text: string = '';
  @Input() active:  boolean = false;
  @Input() btnDisabled: boolean  = false;
  @Input() isBtnSecond: boolean  = false;
}
