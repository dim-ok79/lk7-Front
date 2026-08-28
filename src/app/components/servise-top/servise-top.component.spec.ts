import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiseTopComponent } from './servise-top.component';

describe('ServiseTopComponent', () => {
  let component: ServiseTopComponent;
  let fixture: ComponentFixture<ServiseTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiseTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiseTopComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
