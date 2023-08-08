import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

const Firebase_API: string = "https://pacman-b7575-default-rtdb.firebaseio.com/top_users.json"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getTopTen() {
    return this.http.get<UserModel[]>(Firebase_API);
  }
}
