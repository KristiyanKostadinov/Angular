import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public users: User[] = [];
  public currentUser!: User;
  public username!: string;
  public password!: string;
  public robot!: boolean;

  constructor(private router: Router, private usersService: UsersService, private loggedUser: CurrentUserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  home() {
    this.router.navigate(['/home']);
  }

  login(loginForm: NgForm): void {
    const { username, password } = loginForm.value;
    const user = this.users.find((u: User) => u.username === username && u.website === password);
    if (user) {
      this.loggedUser.setCurrentUser(user);
      localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    } else {
      alert("Invalid username or password!");
    }
  }

  getAllUsers(): void {
    this.usersService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }



}
