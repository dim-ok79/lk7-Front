import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockMobileComponent } from './block-mobile.component';

describe('BlockMobileComponent', () => {
  let component: BlockMobileComponent;
  let fixture: ComponentFixture<BlockMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockMobileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
