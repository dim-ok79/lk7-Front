import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Size } from '../../services/size';
import { HomePcComponent } from '../../components/home/home-pc/home-pc.component';
import { HomeMobileComponent } from '../../components/home/home-mobile/home-mobile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomePcComponent, HomeMobileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [Size],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit{

  public deviceType: string = '';

  constructor(private size: Size,
  ){
    this.deviceType = this.size.getDeviceType();
    console.log('HomeComponent this.deviceType =', this.deviceType);
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

