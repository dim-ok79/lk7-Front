import { Component, OnInit } from '@angular/core';
import { Size } from '../../services/size';
import { PaymentsMobileComponent } from '../../components/payments/payments-mobile/payments-mobile.component';
import { PaymentsPcComponent } from '../../components/payments/payments-pc/payments-pc.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  imports: [CommonModule, PaymentsMobileComponent, PaymentsPcComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent implements OnInit{

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
