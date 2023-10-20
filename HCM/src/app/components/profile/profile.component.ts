import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public loggedInUser: UserModel | null = null;
  public originalUserData: UserModel | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user;
    });

    if (this.loggedInUser) {
      this.profileForm = new FormGroup({
        first_name: new FormControl(this.loggedInUser.first_name),
        last_name: new FormControl(this.loggedInUser.last_name),
        age: new FormControl(this.loggedInUser.age),
        city: new FormControl(this.loggedInUser.city),
        gender: new FormControl(this.loggedInUser.gender),
        email: new FormControl(this.loggedInUser.email),
        department: new FormControl(this.loggedInUser.department),
      });
    }
  }

  updateUserData() {
    const updatedUser = { ...this.loggedInUser, ...this.profileForm.value };

    if (this.loggedInUser) {
      this.userService.updateProfile(this.loggedInUser.id, updatedUser).subscribe();
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      this.userService.setLoggedInUser(updatedUser);
    }
  }

  cancelChanges() {
    this.profileForm.reset(this.loggedInUser);
  }

}
