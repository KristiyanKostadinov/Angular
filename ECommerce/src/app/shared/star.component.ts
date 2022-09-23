import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: "app-star",
    templateUrl: "./star.component.html",
    styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnChanges {
    @Input() public rating: number = 0;
    public cropWidth: number = 75;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75 / 5;
    }

    public onClick() {
        this.ratingClicked.emit(" The rating "+this.rating+" was clicked!");
    }

}