import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-my-doc-mydoc',
  imports: [],
  templateUrl: './my-doc-mydoc.component.html',
  styleUrl: './my-doc-mydoc.component.scss',
})
export class MyDocMydocComponent {
  _testHeightBlock = signal<number>(100);

  @Input()
  set testHeightBlock(value: number) {
    this._testHeightBlock.set(value);
  }

  get testHeightBlock():number {
    return this._testHeightBlock();
  }


}
