import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { DeliveryModel } from '../models/delivery.model';
import { catchError } from "rxjs/operators";


const url: string = "https://kek-s-pizzeria-default-rtdb.firebaseio.com/orders.json";

@Injectable({
    providedIn: "root",
})

export class DeliveryService {

    private errMsg: string = '';

    constructor(private http: HttpClient) {
    }

    public placeOrder(
        fname: string,
        lname: string,
        town: string,
        district: string,
        street: string,
        apartment: string,
        postcode: number,
        phone: number,
        email: string,
        tandc: boolean,
        ordereditems:string,
        price: number,
        cashorvisa: boolean,
        cardnumber?: number,
        cardholder?: string,
        expirymonth?: number,
        expiryyear?: number,
        securitycode?: number,
        companyname?: string,
        notes?: string,
    ) {
        const order: DeliveryModel = {
            fname: fname,
            lname: lname,
            companyname: companyname,
            town: town,
            district: district,
            street: street,
            apartment: apartment,
            postcode: postcode,
            phone: phone,
            email: email,
            notes: notes,
            ordereditems: ordereditems,
            price: price,
            cashorvisa: cashorvisa,
            cardnumber: cardnumber,
            cardholder: cardholder,
            expirymonth: expirymonth,
            expiryyear: expiryyear,
            securitycode: securitycode,
            tandc: tandc
        }
        this.http.post(url, order).pipe(
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