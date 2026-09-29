import { Component, Input, signal } from '@angular/core';

// ПрофОсмотры
@Component({
  selector: 'app-my-doc-prof-examinations',
  imports: [],
  templateUrl: './my-doc-prof-examinations.component.html',
  styleUrl: './my-doc-prof-examinations.component.scss',
})
export class MyDocProfExaminationsComponent {
  _testHeightBlock = signal<number>(100);

  @Input()
  set testHeightBlock(value: number) {
    this._testHeightBlock.set(value);
  }

  get testHeightBlock():number {
    return this._testHeightBlock();
  }

}
