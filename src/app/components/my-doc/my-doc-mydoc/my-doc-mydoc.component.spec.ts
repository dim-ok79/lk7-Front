import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocMydocComponent } from './my-doc-mydoc.component';

describe('MyDocMydocComponent', () => {
  let component: MyDocMydocComponent;
  let fixture: ComponentFixture<MyDocMydocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDocMydocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDocMydocComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
