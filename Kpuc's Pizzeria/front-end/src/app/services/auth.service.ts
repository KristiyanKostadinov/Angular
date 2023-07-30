import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInUser!: any;

  constructor() {
  }

  setLoggedInUser(user: any) {
    this.loggedInUser = JSON.stringify(user.user);
    localStorage.setItem("user", this.loggedInUser);
    if (user.user.position) {
      localStorage.setItem("position", user.user.position);
    }
  }

  getLoggedInUser(): Observable<any> {
    const userString = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(userString || '{}');
    return of(this.loggedInUser);
  }

}
