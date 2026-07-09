import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePcComponent } from './home-pc.component';

describe('HomePcComponent', () => {
  let component: HomePcComponent;
  let fixture: ComponentFixture<HomePcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
