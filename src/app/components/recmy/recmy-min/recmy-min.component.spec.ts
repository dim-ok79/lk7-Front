import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecmyMinComponent } from './recmy-min.component';

describe('RecmyMinComponent', () => {
  let component: RecmyMinComponent;
  let fixture: ComponentFixture<RecmyMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecmyMinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecmyMinComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
