import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReservationDialogComponent } from './table-reservation-dialog.component';

describe('TableReservationDialogComponent', () => {
  let component: TableReservationDialogComponent;
  let fixture: ComponentFixture<TableReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableReservationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
