import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  deleteUser(name: string, id: number): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      alert("DELETED " + name);
    });
  }
}
