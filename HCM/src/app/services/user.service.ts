import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

const USERS_URL = "https://hcmapp-34ba5-default-rtdb.firebaseio.com/users.json"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUser = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(USERS_URL).pipe(map((res) => {
      const users: UserModel[] = [];
      for (const key in res) {
        const user = res[key];
        user.id = key;
        users.push(user);
      }
      return users;
    }
    ));
  }

  fetchEmployees() {
    return this.http.get<UserModel[]>(USERS_URL).pipe(map((res) => {
      const employees: UserModel[] = [];
      for (const key in res) {
        const user = res[key];
        if (user.type === 'employee') {
          user.id = key;
          employees.push(user);
        }
      }
      return employees;
    }))
  }


  fetchEmployeeById(id: string): Observable<UserModel> {
    const userUrl = "https://hcmapp-34ba5-default-rtdb.firebaseio.com/users/" + id + ".json";
    return this.http.get<UserModel>(userUrl).pipe(
      map((user: UserModel) => {
        user.id = id;
        return user;
      })
    );
  }

  setLoggedInUser(user: UserModel | null) {
    this.loggedInUser.next(user);
  }

  getLoggedInUser(): Observable<UserModel | null> {
    return this.loggedInUser.asObservable();
  }

  addEmployee(employee: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(USERS_URL, employee);
  }

  updateProfile(id: string, userData: UserModel) {
    const updateProfileURL = "https://hcmapp-34ba5-default-rtdb.firebaseio.com/users/" + id + ".json";
    return this.http.put<UserModel>(updateProfileURL, userData);
  }

  deleteProfile(id: string) {
    const removeProfileURL = "https://hcmapp-34ba5-default-rtdb.firebaseio.com/users/" + id + ".json";
    return this.http.delete<UserModel>(removeProfileURL);
  }

}
