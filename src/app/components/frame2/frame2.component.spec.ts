import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame2Component } from './frame2.component';

describe('Frame2Component', () => {
  let component: Frame2Component;
  let fixture: ComponentFixture<Frame2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frame2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Frame2Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
