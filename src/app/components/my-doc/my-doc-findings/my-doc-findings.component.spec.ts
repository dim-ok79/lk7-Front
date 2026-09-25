import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocFindingsComponent } from './my-doc-findings.component';

describe('MyDocFindingsComponent', () => {
  let component: MyDocFindingsComponent;
  let fixture: ComponentFixture<MyDocFindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocFindingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocFindingsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
