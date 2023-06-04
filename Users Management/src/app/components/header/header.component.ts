import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: any;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
  }

  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

}
