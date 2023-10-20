import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolver implements Resolve<UserModel | null> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel | null> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.userService.fetchEmployeeById(id);
    }
    return of(null);
  }
}
