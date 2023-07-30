import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public typeOfLogin: any;
  public customers: Customer[] = [];
  position: any;

  constructor(private users: UserService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.getCustomers();
    this.position = localStorage.getItem("position");

  }

  getCustomers() {
    this.users.getCustomers().subscribe((res) => {
      this.customers = res as Customer[];
    });
  }

  deleteCustomer(customerId: any) {
    this.users.deleteCustomer(customerId).subscribe(
      (res)=>{
        this.getCustomers();
      }
    )
  }

}
