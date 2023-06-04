import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private userSubject: Subject<User> = new Subject<User>();
  public user$: Observable<User> = this.userSubject.asObservable();

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
    console.log("Current User:", user);
  }

  getCurrentUser(): Observable<User | null> {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString);
      return of(user);
    } else {
      return of(null);
    }
  }
}
