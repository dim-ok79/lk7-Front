import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolzInformationsComponent } from './polz-informations.component';

describe('PolzInformationsComponent', () => {
  let component: PolzInformationsComponent;
  let fixture: ComponentFixture<PolzInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolzInformationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolzInformationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
