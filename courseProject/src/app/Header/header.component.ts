import {Component, EventEmitter, Output} from "@angular/core"

@Component({
  selector:"app-header",
  templateUrl:"./header.component.html"
})

export class HeaderComponent {
  @Output() selectedCh = new EventEmitter<string>();

  onSelect(ch: string) {
    this.selectedCh.emit(ch);

  }
}
