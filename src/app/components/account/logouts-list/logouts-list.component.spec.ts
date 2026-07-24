import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutsListComponent } from './logouts-list.component';

describe('LogoutsListComponent', () => {
  let component: LogoutsListComponent;
  let fixture: ComponentFixture<LogoutsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
