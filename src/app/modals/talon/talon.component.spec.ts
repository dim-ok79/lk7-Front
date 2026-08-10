import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonComponent } from './talon.component';

describe('TalonComponent', () => {
  let component: TalonComponent;
  let fixture: ComponentFixture<TalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TalonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
