import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocExaminationsComponent } from './my-doc-examinations.component';

describe('MyDocExaminationsComponent', () => {
  let component: MyDocExaminationsComponent;
  let fixture: ComponentFixture<MyDocExaminationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocExaminationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocExaminationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
