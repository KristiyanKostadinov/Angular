import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public currentDate: Date;
  public currentUserName: string | undefined;
  public user: any

  constructor(private route: ActivatedRoute, private userService: UsersService, private currentUserService: CurrentUserService) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.currentUserService.getCurrentUser().subscribe((user: User | null) => {
      this.currentUserName = user!.name;
    })
  }
}
