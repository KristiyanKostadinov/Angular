import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public top_users: UserModel[] = [];

  constructor(private users: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getLeaderboard();
  }

  getLeaderboard(): void {
    this.users.getTopTen().subscribe(
      (users: UserModel[]) => {
        users.sort((a, b) => b.score - a.score);
        this.top_users = users.slice(0, 10);
      },
      (error) => {
        console.error('Error fetching leaderboard:', error);
      }
    );
  }

  startGame(): void {
    this.router.navigateByUrl('/game');
  }
}
