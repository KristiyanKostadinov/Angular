import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggedInUser: UserModel | null = null;
  public isMenuOpen: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user;
    })
  }

  logout() {
    this.userService.setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  }

  toggleMenu() {
    this.isMenuOpen = true;
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 5000);
  }

}
