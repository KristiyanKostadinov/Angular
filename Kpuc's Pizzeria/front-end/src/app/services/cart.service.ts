import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";

const API_URL: string = "https://localhost:3000/orders";

@Injectable({
    providedIn: "root",
})

export class CartService {

    private errMsg: string = '';

    constructor(private http: HttpClient) {
    }

    public placeOrder(order: any) {
        return this.http.post(API_URL, order).pipe(
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

    public getOrders() {
        return this.http.get(API_URL);
    }

    public getUserOrder(id: string) {
        return this.http.get("https://localhost:3000/orders/user/" + id);
    }

    public updateOrder(orderId: string, updatedOrderData: any) {
        const url = API_URL + "/" + orderId;
        return this.http.put(url, updatedOrderData);
    }

    public getOrder(orderId: string) {
        const url = API_URL + "/" + orderId;
        return this.http.get(url);
    }

    public deleteOrder(orderId: string) {
        const url = API_URL + "/" + orderId;
        return this.http.delete(url);
    }
}