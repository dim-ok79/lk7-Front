import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocPcLabComponent } from './my-doc-pc-lab.component';

describe('MyDocPcLabComponent', () => {
  let component: MyDocPcLabComponent;
  let fixture: ComponentFixture<MyDocPcLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocPcLabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocPcLabComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
