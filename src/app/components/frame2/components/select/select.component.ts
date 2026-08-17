import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { CommonModule, NgClass } from '@angular/common';
import { Ioption } from '../../../../interfaces/frame2/select.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})

export class SelectComponent {
  @Input() label: string = '';
  @Input() list: Ioption[] = [];
  @Input() selectCurrent: Ioption | null = null;

  @Output() onChange = new EventEmitter<Ioption | null>(); // Событие выбора

  constructor(){}

  ngOnInit(): void {
  }

  onSelected(ev: any){
/*
console.log('select ev=', ev);
console.log('select ev.value=', ev.value);
*/

/*
    const val = this.list.filter(item => item.text == ev.value);
    console.log('select val=', val);
    if (val && val.length>0){
      this.selectCurrent = val[0];
      this.onChange.emit(this.selectCurrent);
    } else {
      this.onChange.emit(null);
      this.selectCurrent = null;
    }
*/

    if (ev && ev.value){
      this.selectCurrent = ev.value;
      this.onChange.emit(ev.value);
    } else {
      this.onChange.emit(null);
    }
  }
}
