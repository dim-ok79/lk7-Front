import { Component, inject, Input, signal, ViewEncapsulation } from '@angular/core';
import { Action } from '../../services/action.service';
import { BlockGoyComponent } from '../common/block-goy/block-goy.component';
import { IActionS } from '../../interfaces/action.interface';
import { ActionItemComponent } from './action-item/action-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actions',
  imports: [BlockGoyComponent, ActionItemComponent, CommonModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class ActionsComponent {
  tmp_block: string = "";

  @Input()
  set block(value: string) {
    this.tmp_block = value;
    if (this.tmp_block){
      this.getList(this.tmp_block);
    }
  }


  urlAll : string = '';
  action = signal<IActionS | null>(null);

  actionS = inject(Action);

  constructor(){
  }

  getList(nameBlock: string){
    this.actionS.getActionList()
      .subscribe(
        info => {
          console.log('info=', info);
          let tmp = info.filter(item => item.block == nameBlock)[0];
          this.action.set(tmp);
          this.urlAll = this.action()?.allurl ?? '';
          console.log('info this.action=', this.action());

        }, err => {
          console.error('ERR=', err);
        }
      );

  }

}
