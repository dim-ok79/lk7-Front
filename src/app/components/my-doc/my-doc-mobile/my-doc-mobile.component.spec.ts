import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocMobileComponent } from './my-doc-mobile.component';

describe('MyDocMobileComponent', () => {
  let component: MyDocMobileComponent;
  let fixture: ComponentFixture<MyDocMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocMobileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
