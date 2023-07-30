import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { CartComponent } from "../../cart/cart.component";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RateService } from "src/app/services/rate.service";

@Component({
    selector: 'app-rate-dialog',
    templateUrl: './rate-dialog.component.html',
    styleUrls: ['./rate-dialog.component.css']
})
export class RateDialog implements OnInit {
    comment: string = '';
    currentRating: number = 0;

    rateMethod: () => void; // Declare the rateMethod as a function type

    constructor(
        public dialogRef: MatDialogRef<RateDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private rateService: RateService
    ) {
        this.rateMethod = data.rateMethod;
    }

    ngOnInit(): void {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onOkClick(): void {
        this.dialogRef.close();
        const rate = this.currentRating; // Get the rate value from the dialog component
        const comment = this.comment; // Get the comment value from the dialog component

        this.rateService.setRate(rate);
        this.rateService.setComment(comment);

        this.rateMethod();
    }




}