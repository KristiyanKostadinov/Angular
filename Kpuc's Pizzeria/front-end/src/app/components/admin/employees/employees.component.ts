import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  public typeOfLogin: any;
  public employees: any;
  position: any

  constructor(private users: UserService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.getEmployees();
    this.position = localStorage.getItem("position");
  }

  getEmployees() {
    this.users.getEmployees().subscribe((res) => {
      this.employees = res;
    });
  }

  deleteEmployee(employeeId: any){
    this.users.deleteEmployee(employeeId).subscribe((res)=>{
      this.getEmployees();
    })
  }
}
