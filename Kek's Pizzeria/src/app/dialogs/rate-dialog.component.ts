import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-rate-dialog',
    templateUrl: './rate-dialog.component.html',
    styleUrls: ['./rate-dialog.component.css']
})
export class RateDialog {
    public currentRating: number = 0;

    constructor(
        public dialogRef: MatDialogRef<RateDialog>
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOkClick(): void {
        this.dialogRef.close();
        console.log(this.currentRating);
    }
}