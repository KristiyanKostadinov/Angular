import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users: UserModel[] = [];
  public userKeys: any;
  public loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      loginUsername: new FormControl('', [Validators.required]),
      loginPassword: new FormControl('', [Validators.required]),
      robot: new FormControl(false, Validators.requiredTrue)
    });

    this.userService.fetchUsers().subscribe((res) => {
      this.users = res;
    })
  }

  login() {
    const user = this.users.find((user) => {
      if (
        user.username === this.loginForm.get('loginUsername')!.value &&
        user.password === this.loginForm.get("loginPassword")!.value
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (user) {
      this.userService.setLoggedInUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      this.router.navigateByUrl("home");
    }
  }

  back() {
    this.router.navigateByUrl("home");
  }
}
