import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDocComponent } from './block-doc.component';

describe('BlockDocComponent', () => {
  let component: BlockDocComponent;
  let fixture: ComponentFixture<BlockDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockDocComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
