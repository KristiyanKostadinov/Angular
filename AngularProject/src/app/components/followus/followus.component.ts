import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FollowerModel} from "../../models/follower.model";
import {HttpClient} from "@angular/common/http";
import {FollowersService} from "../../services/followers.service";
import {RegionEnum} from "../../enums/region.enum";
import {NotificationEnum} from "../../enums/notification.enum";

//countries
const BULGARIA: string = "Bulgaria";
const UK: string = "United Kingdom";
const GERMANY: string = "Germany";
const FRANCE: string = "France";

//notifications
const DAILY: string = "Daily";
const WEEKLY: string = "Weekly";
const MONTHLY: string = "Monthly";

//titles
const MR: string = "Mr.";
const MS: string = "Ms.";

//form control name
const TITLE: string = "title";
const NAME: string = "name";
const EMAIL: string = "email";
const COUNTRY: string = "country";
const N_FREQUENCY: string = "notification_frequency";
const T_AND_C: string = "t_and_c";

@Component({
  selector: 'app-followus',
  templateUrl: './followus.component.html',
  styleUrls: ['./followus.component.css']
})
export class FollowusComponent implements OnInit {

  public titles: Array<string> = [MR, MS];

  private letters: RegExp = /^[A-Za-z]+$/;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private formGroup = new FormGroup({});

  public readonly regions: Array<{ key: string, label: string }> = [
    {key: RegionEnum.Bulgaria, label: BULGARIA},
    {key: RegionEnum.UnitedKingdom, label: UK},
    {key: RegionEnum.Germany, label: GERMANY},
    {key: RegionEnum.France, label: FRANCE},
  ];

  public readonly notifications: Array<{ key: string, label: string }> = [
    {key: NotificationEnum.Daily, label: DAILY},
    {key: NotificationEnum.Weekly, label: WEEKLY},
    {key: NotificationEnum.Monthly, label: MONTHLY}
  ];

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
      email: new FormControl('', [Validators.pattern(this.emailValidation), Validators.required]),
      country: new FormControl('', Validators.required),
      notification_frequency: new FormControl(''),
      t_and_c: new FormControl('', Validators.required)
    });
  }

  constructor(private http: HttpClient, private followerService: FollowersService) {
  }

  get followUsForm(): FormGroup {
    return this.formGroup;
  }

  get title(): AbstractControl {
    return this.formGroup.get(TITLE)!;
  }

  get name(): AbstractControl {
    return this.formGroup.get(NAME)!;
  }

  get email(): AbstractControl {
    return this.formGroup.get(EMAIL)!;
  }

  get country(): AbstractControl {
    return this.formGroup.get(COUNTRY)!;
  }

  get notificationFr(): AbstractControl {
    return this.formGroup.get(N_FREQUENCY)!;
  }

  get terms(): AbstractControl {
    return this.formGroup.get(T_AND_C)!;
  }

  public onCreateFollower(followerData: FollowerModel): void {
    this.followerService.createAndSaveFollower(followerData.title, followerData.name, followerData.email, followerData.country, followerData.notification_frequency, followerData.t_and_c);
    this.reset();
  }

  public reset(): void {
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)!.reset();
      this.formGroup.get(key)!.enable({onlySelf: true});
    })
  }

  public deleteRequest(): void {
    this.followerService.deleteFollowers().subscribe();
  }
}
