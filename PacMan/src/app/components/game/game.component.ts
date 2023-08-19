import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public pacmanPosition = { x: 110, y: 190 };

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const stepSize =  5;

    switch (event.key) {
      case 'ArrowLeft':
        this.pacmanPosition.x -= stepSize;
        break;
      case 'ArrowUp':
        this.pacmanPosition.y -= stepSize;
        break;
      case 'ArrowRight':
        this.pacmanPosition.x += stepSize;
        break;
      case 'ArrowDown':
        this.pacmanPosition.y += stepSize;
        break;
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
