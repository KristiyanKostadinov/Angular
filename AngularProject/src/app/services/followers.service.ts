import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FollowerModel} from "../models/follower.model";
import {catchError, map, Observable, of} from "rxjs";

const URL = "https://exam-6734d-default-rtdb.europe-west1.firebasedatabase.app/followers.json";

@Injectable({providedIn: "root"})
export class FollowersService {
  private errorMsg: string = '';

  constructor(private http: HttpClient) {
  }

  public createAndSaveFollower(title: string, name: string, email: string, country: string, notification_frequency: string, t_and_c: boolean): void {
    const follower: FollowerModel = {
      country: country,
      email: email,
      name: name,
      notification_frequency: notification_frequency,
      t_and_c: t_and_c,
      title: title
    };
    this.http.post(URL, follower).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          return this.errorMsg = `Error: ` + error.error.message;
        } else {
          return this.errorMsg = `Error: ` + error.message;
        }
      })).subscribe();
  }

  public getFollowers(): Observable<FollowerModel[] | string> {
    return this.http.get<{ [key: string]: FollowerModel }>(URL).pipe(
      map((getData: { [key: string]: FollowerModel }) => {
        const followersArray: FollowerModel[] = [];
        for (const key in getData) {
          if (getData.hasOwnProperty(key)) {
            followersArray.push({...getData[key], id: key});
          }
        }
        return followersArray;
      }),
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          return this.errorMsg = `Error: ` + error.error.message;
        } else {
          return this.errorMsg = `Error: ` + error.message;
        }
      }));
  }

  public deleteFollowers(): Observable<Object | string> {
    return this.http.delete(URL).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          return this.errorMsg = `Error: ` + error.error.message;
        } else {
          return this.errorMsg = `Error: ` + error.message;
        }
      }));
  }
}
