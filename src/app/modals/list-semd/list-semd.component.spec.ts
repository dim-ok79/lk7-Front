import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSemdComponent } from './list-semd.component';

describe('ListSemdComponent', () => {
  let component: ListSemdComponent;
  let fixture: ComponentFixture<ListSemdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSemdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSemdComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
