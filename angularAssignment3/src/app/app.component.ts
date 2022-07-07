import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularAssignment3';
  showPass = false;
  log = [];
  onClickShow(){
    this.showPass= !this.showPass;
    // @ts-ignore
    this.log.push(this.log.length + 1);
  }
}
