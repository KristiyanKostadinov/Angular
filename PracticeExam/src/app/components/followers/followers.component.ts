import {Component, OnDestroy, OnInit} from '@angular/core';
import {FollowerModel} from "../../models/follower.model";
import {ActivatedRoute, Data} from "@angular/router";
import {takeWhile} from "rxjs";
import {RegionEnum} from "../../enums/region.enum";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit, OnDestroy {
  public followers: FollowerModel[] = [];
  public isFetching: boolean = false;
  private isComponentAlive: boolean = true;
  public flag: typeof RegionEnum = RegionEnum;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.activatedRoute.data.pipe(
      takeWhile(() => this.isComponentAlive)
    ).subscribe((data: Data) => {
      this.followers = data['data'];
      this.isFetching = false;
    });
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }
}
