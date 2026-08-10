import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMobileComponent } from './payments-mobile.component';

describe('PaymentsMobileComponent', () => {
  let component: PaymentsMobileComponent;
  let fixture: ComponentFixture<PaymentsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsMobileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
