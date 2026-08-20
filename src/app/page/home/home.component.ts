import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { Size } from '../../services/size';
import { HomePcComponent } from '../../components/home/home-pc/home-pc.component';
import { HomeMobileComponent } from '../../components/home/home-mobile/home-mobile.component';
import { CommonModule } from '@angular/common';
import { LpuService } from '../../services/lpu.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomePcComponent, HomeMobileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit{
  lpuS = inject(LpuService);
  private sizeS = inject(Size);

  deviceType = signal<string>('');

  constructor(
  ){
    this.lpuS.loadLpuList()
      .subscribe(res => {
        this.deviceType.set(this.sizeS.getDeviceType());
      });
  }

  ngOnInit(): void {
//    this.deviceType.set(this.size.getDeviceType());
  };

  size_pc = ():string => {
    return this.sizeS.pc;
  }

  size_mobile = ():string => {
    return this.sizeS.mobile;
  }

}

