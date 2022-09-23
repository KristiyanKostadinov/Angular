import { Injectable } from "@angular/core";
import { Product } from '../interfaces/products';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ProductService {

    private productUrl = "../../api/products.json";
    private loginUrl = "../../api/login.json"
    public dbTest = "https://ords.traxxeo.com/";
    public dbTest2 = "https://ords-staging.traxxeo.com/";

    constructor(private http: HttpClient) {
    }

    public getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl);
    }

    public getProduct(id: number): Observable<Product | undefined> {
        return this.getProducts()
            .pipe(
                map((products: Product[]) => products.find(p => p.productId === id))
            );
    }

    public getTestDBData() {
        return this.http.get(this.dbTest2 + "products/data");
    }

    public getLoginData() {
        return this.http.get(this.loginUrl);
    }

    //error msg
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = "An error occurred: " + err.error.message;
        }
        else {
            errorMessage = "Server returned code: " + err.status + ", error message is: " + err.message;
        }
        console.log(errorMessage);
        return throwError(() => errorMessage);
    }
}