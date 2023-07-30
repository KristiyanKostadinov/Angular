import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  public typeOfLogin: any;
  public adminForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");

    this.adminForm = this.formBuilder.group({
      position: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(1)]],
      repeatPassword: ['', Validators.required],
    });
  }

  addCOO(form: any) {
    const { repeatPassword, ...rest } = form;
    this.userService.createAdmin(rest.username, rest.name, rest.gender, rest.email, rest.password, "admin", rest.position);
    this.reset();
  }

  addCFO(form: any) {
    const { repeatPassword, ...rest } = form;
    this.userService.createAdmin(rest.username, rest.name, rest.gender, rest.email, rest.password, "admin", rest.position);
    this.reset();
  }

  addCTO(form: any) {
    const { repeatPassword, ...rest } = form;
    this.userService.createAdmin(rest.username, rest.name, rest.gender, rest.email, rest.password, "admin", rest.position);
    this.reset();
  }

  addCMO(form: any) {
    const { repeatPassword, ...rest } = form;
    this.userService.createAdmin(rest.username, rest.name, rest.gender, rest.email, rest.password, "admin", rest.position);
    this.reset();
  }

  reset() {
    this.adminForm.reset();
  }
}
