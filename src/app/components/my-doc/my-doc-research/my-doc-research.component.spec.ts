import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocResearchComponent } from './my-doc-research.component';

describe('MyDocResearchComponent', () => {
  let component: MyDocResearchComponent;
  let fixture: ComponentFixture<MyDocResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocResearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocResearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
