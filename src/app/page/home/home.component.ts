import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
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
  providers: [Size],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit{
  lpuS = inject(LpuService);

  public deviceType: string = '';

  constructor(private size: Size,
  ){
    this.deviceType = this.size.getDeviceType();
    console.log('HomeComponent this.deviceType =', this.deviceType);
    this.lpuS.loadLpuList()
      .subscribe(res => {});

  }

  ngOnInit(): void {
    this.deviceType = this.size.getDeviceType();
  };

  size_pc = ():string => {
    return this.size.pc;
  }

  size_mobile = ():string => {
    return this.size.mobile;
  }

}

