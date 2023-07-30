import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Kpuc's Pizzeria";
  constructor(private router: Router, private translateService: TranslateService) {
    this.translateService.use(localStorage.getItem("lang") || "bg");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const type = localStorage.getItem("typeOfLogin");
    if (isLoggedIn && type === 'admin') {
      this.router.navigate(['/admin']);
    } else if (isLoggedIn && type === 'employee') {
      this.router.navigate(['/employee'])
    } else if (isLoggedIn && type === 'customer') {
      this.router.navigate(['/customer'])
    } else if (isLoggedIn && type === 'anonymous') {
      this.router.navigate(['/anonymous'])
    }
    else {
      // alert("Session expired");
      this.router.navigate(['/login']);
    }
  }
}
