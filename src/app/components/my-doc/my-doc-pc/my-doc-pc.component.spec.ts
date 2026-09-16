import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocPcComponent } from './my-doc-pc.component';

describe('MyDocPcComponent', () => {
  let component: MyDocPcComponent;
  let fixture: ComponentFixture<MyDocPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocPcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocPcComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
