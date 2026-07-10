import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponet } from './base-componet';

describe('BaseComponet', () => {
  let component: BaseComponet;
  let fixture: ComponentFixture<BaseComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseComponet],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
