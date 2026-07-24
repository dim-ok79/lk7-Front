import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPcComponent } from './index-pc.component';

describe('IndexPcComponent', () => {
  let component: IndexPcComponent;
  let fixture: ComponentFixture<IndexPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexPcComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
