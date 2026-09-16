import { Component, inject, signal } from '@angular/core';
import { Size } from '../../services/size';
import { CommonModule } from '@angular/common';
import { NgbdToastGlobal } from '../../utils/toast/toast-global.component';
import { MyDocPcComponent } from '../../components/my-doc/my-doc-pc/my-doc-pc.component';
import { MyDocMobileComponent } from '../../components/my-doc/my-doc-mobile/my-doc-mobile.component';

@Component({
  selector: 'app-my-doc',
  imports: [CommonModule, NgbdToastGlobal, MyDocPcComponent, MyDocMobileComponent],
  templateUrl: './my-doc.component.html',
  styleUrl: './my-doc.component.scss',
})
export class MyDocComponent {
  private sizeS = inject(Size);
  deviceType = signal<string>('');

  constructor(
  ) {
    this.setDeviceType();
  };

  setDeviceType(){
    this.deviceType.set(this.sizeS.getDeviceType());
    console.log('HOME this.deviceType()=', this.deviceType());
  }

  size_pc = ():string => {
    return this.sizeS.pc;
  }

  size_mobile = ():string => {
    return this.sizeS.mobile;
  }

}
