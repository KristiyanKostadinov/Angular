import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  public typeOfLogin: any;
  constructor() { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
  }

}
