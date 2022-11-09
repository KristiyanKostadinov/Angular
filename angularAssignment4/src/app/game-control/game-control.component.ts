import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() intervalStarter= new EventEmitter<number>();
  //@ts-ignore
  interval;
  lastNum = 0;
  constructor() { }

  ngOnInit(): void {
  }

  OnStartGame()
  {
    this.interval = setInterval(() => {
    this.intervalStarter.emit(this.lastNum +1);
    this.lastNum++;
    },1000);

  }

  OnPauseGame(){
    clearInterval(this.interval)
  }
}
