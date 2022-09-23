import {Component, OnDestroy, OnInit} from '@angular/core';
import {PriceModel} from "../../models/price.model";
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit, OnDestroy {

  public price: PriceModel | null = null;
  private isComponentAlive: boolean = true;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.price = data['data'];
    });
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }
}


