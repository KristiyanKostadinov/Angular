import {Component, OnInit, Input} from '@angular/core';
import {PriceModel} from "../../../models/price.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  public price: PriceModel | null = null;

  ngOnInit(): void {
  }

}
