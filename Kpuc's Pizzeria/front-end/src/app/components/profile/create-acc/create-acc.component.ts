import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-acc',
  templateUrl: './create-acc.component.html',
  styleUrls: ['./create-acc.component.css']
})
export class CreateAccComponent implements OnInit {
  public users: any;
  public signupForm!: FormGroup;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private letters: RegExp = /^[A-Za-zа-яА-Я]+$/;
  private phoneNumber: RegExp = /^\d{9}$/;
  public usernameExistsError: boolean = false;
  public emailExistsError: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllCustomers();

    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern(this.letters)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailValidation)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    });
  }

  create(form: any) {
    const { repeatPassword, ...rest } = form;

    const usernameExists = this.users.some((user: any) => user.username === rest.username);
    const emailExists = this.users.some((user: any) => user.email === rest.email);
    const phoneNumber = "+359 " + rest.phone;

    if (usernameExists) {
      this.usernameExistsError = true;
      this.emailExistsError = false;
      console.log("username exists");
    }

    if (emailExists) {
      this.emailExistsError = true;
      this.usernameExistsError = false;
      console.log("email exists");
    }

    if (emailExists && usernameExists) {
      this.emailExistsError = true;
      this.usernameExistsError = true;
      console.log("both exist");
    }

    if (!usernameExists && !emailExists) {
      this.userService.createCustomer(rest.username, rest.name, rest.gender, rest.email, phoneNumber, rest.password, "customer");
      this.emailExistsError = false;
      this.usernameExistsError = false;
      this.reset();
      alert("Successfully created!");
      console.log(rest.gender);
    }

  }


  getAllCustomers() {
    this.userService.getCustomers().subscribe((res) => {
      this.users = res;
    })
  }

  setDE() {
    localStorage.setItem("lang", "de")
    window.location.reload();
  }

  setEN() {
    localStorage.setItem("lang", "en")
    window.location.reload();
  }

  setBG() {
    localStorage.setItem("lang", "bg")
    window.location.reload();
  }

  get name(): AbstractControl {
    return this.signupForm.get("name")!;
  }
  get username(): AbstractControl {
    return this.signupForm.get("username")!;
  }

  get email(): AbstractControl {
    return this.signupForm.get("email")!;
  }

  get phone(): AbstractControl {
    return this.signupForm.get("phone")!;
  }

  get password(): AbstractControl {
    return this.signupForm.get("password")!;
  }

  public reset(): void {
    Object.keys(this.signupForm.controls).forEach((key) => {
      this.signupForm.get(key)!.reset();
      this.signupForm.get(key)!.enable({ onlySelf: true });
    })
  }
}
