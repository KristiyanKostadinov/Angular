import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularAssignment4';
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];


  onIntervalStarted(num: number){
  if(num % 2 ===0){
    this.evenNumbers.push(num);
  }
  else{
    this.oddNumbers.push(num);
  }
  }
}
