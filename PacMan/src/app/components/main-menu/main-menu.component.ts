import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { UsersService } from 'src/app/services/users.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit, OnDestroy {

  public top_users: UserModel[] = [];
  public isVolumeMuted: boolean = false;
  private buttonSound!: Howl;

  constructor(private users: UsersService, private router: Router, private leaderboardService: LeaderboardService) {
    this.buttonSound = new Howl({
      src: ['../../assets/sounds/pacman_beginning.wav'],
      volume: 0.2,
      loop: true,
    });
  }

  ngOnInit(): void {
    this.buttonSound.play();
    this.subscribeToLeaderboardRefresh();
  }

  ngOnDestroy(): void {
    this.buttonSound.stop();
  }

  subscribeToLeaderboardRefresh() {
    this.leaderboardService.getLeaderboardRefreshObservable().subscribe(() => {
      this.getLeaderboard();
    });
  }

  getLeaderboard(): void {
    this.users.getTopTen().subscribe(
      (users: UserModel[]) => {
        const arrayOfUsers = Object.values(users);
        arrayOfUsers.sort((a, b) => b.score - a.score);
        this.top_users = arrayOfUsers.slice(0, 10);
      },
      (error) => {
        console.error('Error fetching leaderboard:', error);
      }
    );
  }

  startGame(): void {
    this.router.navigateByUrl('/game');
  }

  toggleVolume(): void {
    this.isVolumeMuted = !this.isVolumeMuted;
    if (this.isVolumeMuted) {
      this.buttonSound.stop();
    } else {
      this.buttonSound.play();
    }
  }
}
