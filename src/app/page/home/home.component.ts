import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { Size } from '../../services/size';
import { HomePcComponent } from '../../components/home/home-pc/home-pc.component';
import { HomeMobileComponent } from '../../components/home/home-mobile/home-mobile.component';
import { CommonModule } from '@angular/common';
import { LpuService } from '../../services/lpu.service';
import { Router } from '@angular/router';
import { NgbdToastGlobal } from '../../utils/toast/toast-global.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomePcComponent, HomeMobileComponent, NgbdToastGlobal],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit{
  lpuS = inject(LpuService);
  router = inject(Router);

  private sizeS = inject(Size);

  deviceType = signal<string>('');

  constructor(
  ){
console.log('!!! HOME загрузка ЛПУ');
    this.lpuS.loadLpuList()
      .subscribe(res => {
        this.setDeviceType();
      },
        err => {
          this.setDeviceType();
          console.log('ERROR');
        });
  }

  setDeviceType(){
    this.deviceType.set(this.sizeS.getDeviceType());
    console.log('HOME this.deviceType()=', this.deviceType());
    if (this.deviceType() == this.size_mobile()){
      this.router.navigate(['/home-mobile']);
    } else {
    }
  }

  ngOnInit(): void {
  };

  size_pc = ():string => {
    return this.sizeS.pc;
  }

  size_mobile = ():string => {
    return this.sizeS.mobile;
  }

}

