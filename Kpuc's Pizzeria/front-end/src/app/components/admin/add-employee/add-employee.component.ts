import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public typeOfLogin: any;
  public employeeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");

    this.employeeForm = this.formBuilder.group({
      position: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(1)]],
      repeatPassword: ['', Validators.required],
    });
  }

  addCook(form: any) {
    const { repeatPassword, ...rest } = form;
    this.userService.createEmployee(rest.username, rest.name, rest.gender, rest.email, rest.password, "employee", rest.position);
    this.reset();
  }

  addDeliveryDriver(form: any) {
    const { repeatPassword, ...rest } = form;
    this.userService.createEmployee(rest.username, rest.name, rest.gender, rest.email, rest.password, "employee", rest.position);
    this.reset();
  }

  addManager(form: any) {
    const { repeatPassword, ...rest } = form;
    this.userService.createEmployee(rest.username, rest.name, rest.gender, rest.email, rest.password, "employee", rest.position);
    this.reset();
  } 

  reset() {
    this.employeeForm.reset();
  }


}
