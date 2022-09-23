import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-welcome",
  templateUrl: './welcome.component.html',
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {

  public pageTitle = 'Welcome';
  public end = new Date("Dec 24, 2022").getTime();
  public countDown: any;

  constructor() {
  }

  ngOnInit(): void {
    this.countDown = setInterval(() => {
      let now = new Date().getTime();
      let distanceBetween = this.end - now;

      var days = Math.floor(distanceBetween / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distanceBetween % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distanceBetween % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distanceBetween % (1000 * 60)) / 1000);

      if (document.getElementById("countdown")) {
        document.getElementById("countdown")!.innerHTML = days + " days" + "<br>" + hours + "h " + minutes + "m " + seconds + "s";
      }
      else {
        return;
      }
      if (distanceBetween < 0) {
        clearInterval(this.countDown);
        document.getElementById("countdown")!.innerHTML = "HERE WE GOOOO";
      }
    }, 1000);
  }
}
