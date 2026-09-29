import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocProfExaminationsComponent } from './my-doc-prof-examinations.component';

describe('MyDocProfExaminationsComponent', () => {
  let component: MyDocProfExaminationsComponent;
  let fixture: ComponentFixture<MyDocProfExaminationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocProfExaminationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocProfExaminationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
