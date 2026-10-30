import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-btn',
  imports: [CommonModule, MatIconModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class BtnComponent {
  @Input() text: string = '';
  @Input() active:  boolean = false;
  @Input() btnDisabled: boolean  = false;
  @Input() isBtnSecond: boolean  = false;
  @Input() svgIconName: string | null  = null;  // добавляет иконку

}
