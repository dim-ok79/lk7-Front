import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecmyComponent } from './recmy.component';

describe('RecmyComponent', () => {
  let component: RecmyComponent;
  let fixture: ComponentFixture<RecmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecmyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecmyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
