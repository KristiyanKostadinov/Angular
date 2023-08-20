import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public pacmanPosition: {
    x: number;
    y: number;
  } = { x: 110, y: 190 };
  public redEnemyPosition: {
    x: number;
    y: number;
  } = { x: 53, y: 80 };
  public pinkEnemyPosition: {
    x: number;
    y: number;
  } = { x: 97, y: 120 };
  public cyanEnemyPosition: {
    x: number;
    y: number;
  } = { x: 129, y: 120 };
  public orangeEnemyPosition: {
    x: number;
    y: number;
  } = { x: 113, y: 120 };
  public pacman_Arrow_Up: boolean = false;
  public pacman_Arrow_Down: boolean = false;
  public pacman_Arrow_Left: boolean = false;
  public pacman_Arrow_Right: boolean = false;
  private intervalId: ReturnType<typeof setInterval> | undefined;
  public isGameOver: boolean = false;
  public newUserForm!: FormGroup;
  public points: number = 400;
  public redEnemyDirection: string = "";
  public orangeEnemyDirection: string = "";
  public pinkEnemyDirection: string = "";
  public cyanEnemyDirection: string = "";

  constructor(private router: Router, private user: UsersService, private leaderboardService: LeaderboardService) {
  }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      username: new FormControl("", Validators.required)
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const stepSize = 5;

    switch (event.key) {
      case 'ArrowLeft':
        this.startAutoMove('left', stepSize);
        this.pacman_Arrow_Left = true;
        this.redEnemyDirection = 'right';
        this.cyanEnemyDirection = 'left';
        this.orangeEnemyDirection = 'up';
        this.pinkEnemyDirection = 'down';
        this.pacman_Arrow_Up = false;
        this.pacman_Arrow_Right = false;
        this.pacman_Arrow_Down = false;
        break;
      case 'ArrowUp':
        this.startAutoMove('up', stepSize);
        this.pacman_Arrow_Up = true;
        this.redEnemyDirection = 'down';
        this.cyanEnemyDirection = 'up';
        this.orangeEnemyDirection = 'left';
        this.pinkEnemyDirection = 'right';
        this.pacman_Arrow_Right = false;
        this.pacman_Arrow_Down = false;
        this.pacman_Arrow_Left = false;
        break;
      case 'ArrowRight':
        this.startAutoMove('right', stepSize);
        this.pacman_Arrow_Right = true;
        this.redEnemyDirection = 'up';
        this.cyanEnemyDirection = 'right';
        this.orangeEnemyDirection = 'left';
        this.pinkEnemyDirection = 'down';
        this.pacman_Arrow_Up = false;
        this.pacman_Arrow_Down = false;
        this.pacman_Arrow_Left = false;
        break;
      case 'ArrowDown':
        this.startAutoMove('down', stepSize);
        this.pacman_Arrow_Down = true;
        this.redEnemyDirection = 'up';
        this.cyanEnemyDirection = 'right';
        this.orangeEnemyDirection = 'left';
        this.pinkEnemyDirection = 'right';
        this.pacman_Arrow_Up = false;
        this.pacman_Arrow_Right = false;
        this.pacman_Arrow_Left = false;
        break;
    }
  }

  private checkCollisions() {
    const pacmanRadius = 5;
    const enemyRadius = 5;
    const pacmanCenter = {
      x: this.pacmanPosition.x + pacmanRadius,
      y: this.pacmanPosition.y + pacmanRadius
    };
    const enemies = [
      this.redEnemyPosition,
      this.pinkEnemyPosition,
      this.cyanEnemyPosition,
      this.orangeEnemyPosition
    ];

    for (const enemy of enemies) {
      const enemyCenter = {
        x: enemy.x + enemyRadius,
        y: enemy.y + enemyRadius
      };

      const distance = Math.sqrt(
        (pacmanCenter.x - enemyCenter.x) ** 2 + (pacmanCenter.y - enemyCenter.y) ** 2
      );

      if (distance < pacmanRadius + enemyRadius) {
        this.isGameOver = true;
        clearInterval(this.intervalId);
        break;
      }
    }
  }

  private startAutoMove(direction: string, stepSize: number) {

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      switch (direction) {
        case 'left':
          this.pacmanPosition.x -= stepSize;
          break;
        case 'up':
          this.pacmanPosition.y -= stepSize;
          break;
        case 'right':
          this.pacmanPosition.x += stepSize;
          break;
        case 'down':
          this.pacmanPosition.y += stepSize;
          break;
      }
      this.moveRedEnemy();
      this.moveCyanEnemy();
      this.moveOrangeEnemy();
      this.movePinkEnemy();
      this.checkCollisions();
    }, 100);
  }

  private moveRedEnemy() {
    const stepSize = 4;
    switch (this.redEnemyDirection) {
      case 'left':
        this.redEnemyPosition.x -= stepSize;
        break;
      case 'up':
        this.redEnemyPosition.y -= stepSize;
        break;
      case 'right':
        this.redEnemyPosition.x += stepSize;
        break;
      case 'down':
        this.redEnemyPosition.y += stepSize;
        break;
    }
  }

  private moveOrangeEnemy() {
    const stepSize = 4;
    switch (this.orangeEnemyDirection) {
      case 'left':
        this.orangeEnemyPosition.x -= stepSize;
        break;
      case 'up':
        this.orangeEnemyPosition.y -= stepSize;
        break;
      case 'right':
        this.orangeEnemyPosition.x += stepSize;
        break;
      case 'down':
        this.orangeEnemyPosition.y += stepSize;
        break;
    }
  }

  private movePinkEnemy() {
    const stepSize = 4;
    switch (this.pinkEnemyDirection) {
      case 'left':
        this.pinkEnemyPosition.x -= stepSize;
        break;
      case 'up':
        this.pinkEnemyPosition.y -= stepSize;
        break;
      case 'right':
        this.pinkEnemyPosition.x += stepSize;
        break;
      case 'down':
        this.pinkEnemyPosition.y += stepSize;
        break;
    }
  }

  private moveCyanEnemy() {
    const stepSize = 4;
    switch (this.cyanEnemyDirection) {
      case 'left':
        this.cyanEnemyPosition.x -= stepSize;
        break;
      case 'up':
        this.cyanEnemyPosition.y -= stepSize;
        break;
      case 'right':
        this.cyanEnemyPosition.x += stepSize;
        break;
      case 'down':
        this.cyanEnemyPosition.y += stepSize;
        break;
    }
  }

  saveAndGoToMenu() {
    const username = this.newUserForm.get("username")!.value;
    this.user.addNewUser(username, this.points).subscribe(() => {
      this.leaderboardService.refreshLeaderboard();
    });
    this.router.navigateByUrl("/menu");
  }

}
