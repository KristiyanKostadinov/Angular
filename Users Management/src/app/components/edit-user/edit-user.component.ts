import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

const NAME: string = "name";
const USERNAME: string = "username";
const EMAIL: string = "email";
const PHONE: string = "phone";
const WEBSITE: string = "website";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public userForm!: FormGroup;
  public user: any;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private letters: RegExp = /^[A-Za-z]+$/;
  private phoneNumber: RegExp = /^(?:\+359\d{9}|\d{10})$/;

  constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user;
    });

    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailValidation)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
      website: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
    });
  }

  get name(): AbstractControl {
    return this.userForm.get(NAME)!;
  }
  get username(): AbstractControl {
    return this.userForm.get(USERNAME)!;
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

  back() {
    this.router.navigate(['/users']);
  }

  editUser(userData: User) {
    this.userService.updateUser(userData.name, userData.username, userData.email, userData.phone, userData.website)
    console.log(userData);
  }
}
