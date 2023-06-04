import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { Company } from '../models/company.model';

const USERS_URL: string = "https://jsonplaceholder.typicode.com/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_URL);
  }

  getUser(userId: number): Observable<User> {
    const url = USERS_URL + '/' + userId;
    return this.http.get<User>(url);
  }

  deleteUser(userId: number): Observable<User> {
    const url = USERS_URL + '/' + userId;
    return this.http.delete<User>(url);
  }

  updateUser(name: string, username: string, email: string, phone: string, website: string): Observable<User> {
    const user: User = {
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website
    }
    return this.http.put<User>(USERS_URL, user);
  }

  createuser(name: string, username: string, email: string, phone: string, website: string) {
    const user: User = {
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website
    }
    return this.http.post<User>(USERS_URL, user);
  }

}
