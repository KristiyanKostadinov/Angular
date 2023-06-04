import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CurrentUserService } from './services/current-user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: any;
  public currentUrl!: string;

  constructor(private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    if (this.isLoggedIn === 'true') {
      this.router.navigate(['/home']);
    } else {

    }
  }

  isMenuVisible(): boolean {
    const currentRoute = this.router.routerState.snapshot.url;
    return currentRoute !== '/not-found';
  }

}
