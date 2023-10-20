import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loggedInUser: UserModel | null = null;

  constructor() { }

  ngOnInit(): void {
    const storedLoggedInUser = localStorage.getItem("loggedInUser");
    if (storedLoggedInUser != null) {
      this.loggedInUser = JSON.parse(storedLoggedInUser);
    }
  }


}
