import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

const NAME: string = "name";
const USER_NAME: string = "username";
const EMAIL: string = "email";
const PHONE: string = "phone";
const WEBSITE: string = "website";
const AGE: string = "age";
const DATE_OF_BIRTH: string = "date_of_birth";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public userForm!: FormGroup;
  public user: any;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private letters: RegExp = /^[A-Za-z]+$/;
  private numbers: RegExp = /^[0-9]*$/;
  private phoneNumber: RegExp = /^(?:\+359\d{9}|\d{10})$/;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailValidation)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
      website: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
      age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(this.numbers)]),
      dateOfBirth: new FormControl()
    });
  }

  get name(): AbstractControl {
    return this.userForm.get(NAME)!;
  }
  get username(): AbstractControl {
    return this.userForm.get(USER_NAME)!;
  }

  get email(): AbstractControl {
    return this.userForm.get(EMAIL)!;
  }

  get phone(): AbstractControl {
    return this.userForm.get(PHONE)!;
  }

  get website(): AbstractControl {
    return this.userForm.get(WEBSITE)!;
  }

  get age(): AbstractControl {
    return this.userForm.get(AGE)!;
  }

  get dateOfBirth(): AbstractControl {
    return this.userForm.get(DATE_OF_BIRTH)!;
  }

  back() {
    this.router.navigate(['/users']);
  }

  saveUser(userData: User) {
    this.userService.createuser(userData.name, userData.username, userData.email, userData.phone, userData.website)
    console.log(userData);
  }

}