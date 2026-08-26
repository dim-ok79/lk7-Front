import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionItemComponent } from './action-item.component';

describe('ActionItemComponent', () => {
  let component: ActionItemComponent;
  let fixture: ComponentFixture<ActionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
