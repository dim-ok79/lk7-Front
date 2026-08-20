import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMobileComponent } from './index-mobile.component';

describe('IndexMobileComponent', () => {
  let component: IndexMobileComponent;
  let fixture: ComponentFixture<IndexMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexMobileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
