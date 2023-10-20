import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public employeeForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required)
    });
  }

  addEmployeeData() {
    const newEmployee: UserModel = { ...this.employeeForm.value, type: "employee" }
    this.userService.addEmployee(newEmployee).subscribe(() => {
      this.router.navigateByUrl("employees");
    });
    this.employeeForm.reset();
  }

  reset() {
    this.employeeForm.reset();
  }
}
