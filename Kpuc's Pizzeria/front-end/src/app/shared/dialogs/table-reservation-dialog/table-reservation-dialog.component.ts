import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-table-reservation-dialog',
  templateUrl: './table-reservation-dialog.component.html',
  styleUrls: ['./table-reservation-dialog.component.scss']
})
export class TableReservationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TableReservationDialogComponent>
  ) { }
}