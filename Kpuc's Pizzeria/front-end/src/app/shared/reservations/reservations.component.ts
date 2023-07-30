import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  typeOfLogin: any;

  constructor() { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
  }

}
