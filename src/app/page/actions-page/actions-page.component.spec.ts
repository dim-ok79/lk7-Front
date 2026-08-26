import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPageComponent } from './actions-page.component';

describe('ActionsPageComponent', () => {
  let component: ActionsPageComponent;
  let fixture: ComponentFixture<ActionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
