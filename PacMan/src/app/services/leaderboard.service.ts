import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private leaderboardSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  refreshLeaderboard() {
    this.leaderboardSubject.next();
  }

  getLeaderboardRefreshObservable(): Observable<void> {
    return this.leaderboardSubject.asObservable();
  }

}
