import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-preview-user',
  templateUrl: './preview-user.component.html',
  styleUrls: ['./preview-user.component.css']
})
export class PreviewUserComponent implements OnInit {
  public user: any;

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user;
    });
  }

}
