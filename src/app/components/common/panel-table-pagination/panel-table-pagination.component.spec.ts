import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTablePaginationComponent } from './panel-table-pagination.component';

describe('PanelTablePaginationComponent', () => {
  let component: PanelTablePaginationComponent;
  let fixture: ComponentFixture<PanelTablePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelTablePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
