import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL: string = "https://localhost:3000/rates";

@Injectable({
  providedIn: 'root'
})
export class RateService {
  errMsg: any;
  private rate!: number;
  private comment!: string;

  constructor(private http: HttpClient) { }

  setRate(rate: number) {
    this.rate = rate;
  }

  getRate(): number {
    return this.rate;
  }

  setComment(comment: string) {
    this.comment = comment;
  }

  getComment(): string {
    return this.comment;
  }


  getRates() {
    return this.http.get(API_URL);
  }

  createRate(rate: any) {
    return this.http.post(API_URL, rate).pipe(
      catchError(err => {
        if (err.error instanceof ErrorEvent) {
          this.errMsg = 'Error: ' + err.error.message;
        } else {
          this.errMsg = 'Error: ' + err.message;
        }
        throw err;
      })
    );
  }
}
