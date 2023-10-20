import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService){}

  ngOnInit() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if(loggedInUser){
      const user = JSON.parse(loggedInUser);
      this.userService.setLoggedInUser(user);
    }
  }
}
