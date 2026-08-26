import { Component, Input, signal } from '@angular/core';
import { IAction } from '../../../interfaces/action.interface';

@Component({
  selector: 'app-action-item',
  imports: [],
  templateUrl: './action-item.component.html',
  styleUrl: './action-item.component.scss',
})
export class ActionItemComponent {
  @Input()
  set action(value: IAction) {
    this.actionItem.set(value);
  }

  actionItem = signal<IAction | null>(null);

  openAction(){
    // @ts-ignore
    if (this.actionItem() && this.actionItem().url) {
      // @ts-ignore
      window.open(`${this.actionItem().url}`, '_blank');
    }
  }
}
