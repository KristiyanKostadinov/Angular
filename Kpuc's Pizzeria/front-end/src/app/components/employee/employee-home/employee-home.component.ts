import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  public typeOfLogin:any;
  constructor() { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
  }

}
