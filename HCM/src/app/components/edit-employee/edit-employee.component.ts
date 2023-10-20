import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  public profileForm!: FormGroup;
  public employee: UserModel | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.employee = this.route.snapshot.data['employee'];

    if (this.employee) {
      this.profileForm = new FormGroup({
        first_name: new FormControl(this.employee.first_name),
        last_name: new FormControl(this.employee.last_name),
        username: new FormControl(this.employee.username),
        age: new FormControl(this.employee.age),
        city: new FormControl(this.employee.city),
        gender: new FormControl(this.employee.gender),
        email: new FormControl(this.employee.email),
        salary: new FormControl(this.employee.salary),
        department: new FormControl(this.employee.department),
      });
    }
  }

  updateUserData() {
    const updatedEmployee = { ...this.employee, ...this.profileForm.value }

    if (this.employee) {
      this.userService.updateProfile(this.employee.id, updatedEmployee).subscribe();
      this.router.navigateByUrl('employees');
    }
  }

  cancelChanges() {
    this.profileForm.reset(this.employee);
  }

}
