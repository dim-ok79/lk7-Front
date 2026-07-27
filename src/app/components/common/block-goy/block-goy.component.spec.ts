import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockGoyComponent } from './block-goy.component';

describe('BlockGoyComponent', () => {
  let component: BlockGoyComponent;
  let fixture: ComponentFixture<BlockGoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockGoyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockGoyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
