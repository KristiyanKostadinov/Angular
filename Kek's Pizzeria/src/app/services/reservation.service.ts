import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ReservationModel} from "../models/reservation.model";
import {catchError} from "rxjs/operators";

const url: string = "https://kek-s-pizzeria-default-rtdb.firebaseio.com/reservations.json";

@Injectable({providedIn: 'root'})
export class ReservationService {

  private errMsg: string = '';

  constructor(private http: HttpClient) {
  }

  public createReservation(comment: string, date: string, email: string, name: string, neighborhood: string, numberPeople: number, phone: number, time: string, agree: boolean) {
    const reservation: ReservationModel = {
      comment: comment,
      date: date,
      email: email,
      name: name,
      neighborhood: neighborhood,
      phone: phone,
      numberPeople: numberPeople,
      time: time,
      agree: agree
    }
    this.http.post(url, reservation).pipe(
      catchError(err => {
        if (err.error instanceof ErrorEvent) {
          return this.errMsg = 'Error: ' + err.error.message;
        } else {
          return this.errMsg = 'Error: ' + err.message;
        }
      })
    ).subscribe();
  }

}
