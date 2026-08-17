import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnumbComponent } from './rnumb.component';

describe('RnumbComponent', () => {
  let component: RnumbComponent;
  let fixture: ComponentFixture<RnumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RnumbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RnumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
