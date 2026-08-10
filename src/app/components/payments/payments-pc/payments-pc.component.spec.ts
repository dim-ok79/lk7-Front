import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPcComponent } from './payments-pc.component';

describe('PaymentsPcComponent', () => {
  let component: PaymentsPcComponent;
  let fixture: ComponentFixture<PaymentsPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsPcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsPcComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
