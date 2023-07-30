import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {


  public typeOfLogin: any;
  public admins: any;
  public position: any;
  constructor(private users: UserService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.getAdmins();
    this.position = localStorage.getItem("position");
  }

  getAdmins() {
    this.users.getAdmins().subscribe((res) => {
      this.admins = res;
    });
  }

  deleteAdmin(adminId: any) {
    return this.users.deleteAdmin(adminId).subscribe((res) => {
      this.getAdmins();
    });
  }

}
