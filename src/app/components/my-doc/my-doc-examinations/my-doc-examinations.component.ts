import { Component, Input, signal } from '@angular/core';
import { BlockDocComponent } from '../../common/block-doc/block-doc.component';
import { IBlockDoc } from '../../../interfaces/block-doc.interface';

// Исследования
@Component({
  selector: 'app-my-doc-examinations',
  imports: [BlockDocComponent],
  templateUrl: './my-doc-examinations.component.html',
  styleUrl: './my-doc-examinations.component.scss',
})
export class MyDocExaminationsComponent {
  _testHeightBlock = signal<number>(100);

  @Input()
  set testHeightBlock(value: number) {
    this._testHeightBlock.set(value);
  }

  get testHeightBlock():number {
    return this._testHeightBlock();
  }


  mD: IBlockDoc = {infoName: 'sdfsdfdfgd', infoDate: new Date(), infoUrl: ''}
}
