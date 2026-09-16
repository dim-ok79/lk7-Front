import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocComponent } from './my-doc.component';

describe('MyDocComponent', () => {
  let component: MyDocComponent;
  let fixture: ComponentFixture<MyDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
