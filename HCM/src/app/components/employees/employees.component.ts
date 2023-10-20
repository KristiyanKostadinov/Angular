import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public employees: UserModel[] | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.userService.fetchEmployees().subscribe((emp) => {
      this.employees = emp;
    })
  }

  deleteEmployee(id: string) {
    this.userService.deleteProfile(id).subscribe(()=>{
      this.refreshEmployeesList();
    });
  }

  refreshEmployeesList() {
    this.fetchEmployees();
  }
}
