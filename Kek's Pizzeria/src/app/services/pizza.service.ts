import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CartService {

    public cartItemList: any = []
    public productList = new BehaviorSubject<any>([]);
    public search = new BehaviorSubject<string>("");

    constructor(private http: HttpClient) { }

    getPizzas() {
        return this.http.get('assets/pizzas.json');
    }

    getSalads() {
        return this.http.get('assets/salads.json');
    }

    getDesserts() {
        return this.http.get('assets/desserts.json');
    }

    getProducts() {
        return this.productList.asObservable();
    }

    setProduct(product: any) {
        this.cartItemList.push(...product);
        this.productList.next(product);
    }

    addtoCart(product: any) {
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
    }

    getTotalPrice(): number {
        let sum = 0;
        this.cartItemList.map((a: any) => {
            sum += a.price;
        })
        return sum;
    }

    removeCartItem(product: any) {
        this.cartItemList.map((a: any, index: any) => {
            if (product.id === a.id) {
                this.cartItemList.splice(index, 1);
            }
        })
        this.productList.next(this.cartItemList);
    }

    removeAllCart() {
        this.cartItemList = []
        this.productList.next(this.cartItemList);
    }

}