import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

const API_CUSTOMERS: string = "https://localhost:3000/customers";
const API_URL_FORGOT_PASSWORD: string = "https://localhost:3000/customers/forgot-password";
const API_URL_RESET_CODE: string = "https://localhost:3000/customers/verify-reset-code";
const API_URL_BY_EMAIL: string = "https://localhost:3000/customers/update-password-by-email/";
const API_ADMINS: string = "https://localhost:3000/admins";
const API_EMPLOYEES: string = "https://localhost:3000/employees";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(API_CUSTOMERS);
  }

  createCustomer(username: string, name: string, gender: string, email: string, phone: string, password: string, role: string) {
    const customer: any = {
      username: username,
      name: name,
      gender: gender,
      email: email,
      phone: phone,
      password: password,
      role: role
    }
    this.http.post<Customer>(API_CUSTOMERS, customer).subscribe();
  }

  sendForgotPasswordEmail(email: string): Observable<any> {
    const url = API_URL_FORGOT_PASSWORD;
    const body = { email };
    return this.http.post(url, body);
  }

  verifyResetCode(email: string, resetCode: string) {
    const url = API_URL_RESET_CODE;
    const body = { email, resetCode };
    return this.http.post<boolean>(url, body);
  }

  updateCustomerPasswordByEmail(email: string, newPassword: string) {
    const apiUrl = API_URL_BY_EMAIL;
    const url = apiUrl + email;
    const updatedData = { password: newPassword };
    return this.http.put(url, updatedData);
  }

  getAdmins() {
    return this.http.get(API_ADMINS);
  }

  getEmployees() {
    return this.http.get(API_EMPLOYEES);
  }

  createEmployee(username: string, name: string, gender: string, email: string, password: string, role: string, position: string) {
    const employee: any = {
      username: username,
      name: name,
      gender: gender,
      email: email,
      password: password,
      role: role,
      position: position
    }
    this.http.post(API_EMPLOYEES, employee).subscribe();
  }

  createAdmin(username: string, name: string, gender: string, email: string, password: string, role: string, position: string) {
    const admin: any = {
      username: username,
      name: name,
      gender: gender,
      email: email,
      password: password,
      role: role,
      position: position
    }
    this.http.post(API_ADMINS, admin).subscribe();
  }

  deleteAdmin(adminId: any) {
    const url = API_ADMINS + "/" + adminId;
    return this.http.delete(url)
  }
  
  deleteCustomer(customerId: any) {
    const url = API_CUSTOMERS + "/" + customerId;
    return this.http.delete(url)
  }

  deleteEmployee(employeeId: any) {
    const url = API_EMPLOYEES + "/" + employeeId;
    return this.http.delete(url)
  }
}
