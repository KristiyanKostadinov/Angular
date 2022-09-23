import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PriceModel} from "../models/price.model";
import {catchError, Observable} from "rxjs";

const URL: string = "https://exam-6734d-default-rtdb.europe-west1.firebasedatabase.app/prices.json";

@Injectable({providedIn: "root"})
export class PricesService {
  private errorMsg: string = '';

  constructor(private http: HttpClient) {
  }

  public getPrices(): Observable<PriceModel | string> {
    return this.http.get<PriceModel>(URL).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          return this.errorMsg = `Error: ${error.error.message}`;
        } else {
          return this.errorMsg = `Error: ${error.message}`;
        }
      }));
  }
}
