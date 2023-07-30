import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-view-rates',
  templateUrl: './view-rates.component.html',
  styleUrls: ['./view-rates.component.css']
})
export class ViewRatesComponent implements OnInit {

  public currentRating: number = 0;
  public rates: any;
  public typeOfLogin: any;

  constructor(
    private rateService: RateService
  ) { }

  ngOnInit(): void {
    this.getRates();
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
  }

  getRates() {
    this.rateService.getRates().subscribe((rates) => {
      this.rates = rates;
    });
  }
}
