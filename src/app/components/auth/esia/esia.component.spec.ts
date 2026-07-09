import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiaComponent } from './esia.component';

describe('EsiaComponent', () => {
  let component: EsiaComponent;
  let fixture: ComponentFixture<EsiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
