import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../models/product.model";

const API_PIZZAS: string = "https://localhost:3000/pizzas";
const API_SALADS: string = "https://localhost:3000/salads";
const API_DESSERTS: string = "https://localhost:3000/desserts";

@Injectable({
    providedIn: "root",
})
export class ProductsService {

    public cartItemList: any = []
    public productList = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) { }

    getPizzas() {
        return this.http.get(API_PIZZAS);
        // return this.http.get("assets/menu-products/pizzas.json");
    }

    getPizzaImageUrl(image: string): string {
        return API_PIZZAS + "/" + image;
    }

    getSalads() {
        return this.http.get(API_SALADS);
        // return this.http.get("assets/menu-products/salads.json");
    }

    getDesserts() {
        return this.http.get(API_DESSERTS);
        // return this.http.get("assets/menu-products/desserts.json");
    }

    getProducts() {
        return this.productList.asObservable();
    }

    setProduct(product: any) {
        this.cartItemList.push(...product);
        this.productList.next(product);
    }

    addtoCart(product: Product) {
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getPrice();
    }

    getPrice(): number {
        let sum = 0;
        this.cartItemList.map((a: any) => {
            sum = a.price;
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

    addPizza(formData: FormData): Observable<any> {
        return this.http.post(API_PIZZAS, formData);
    }

    addSalad(formData: FormData): Observable<any> {
        return this.http.post(API_SALADS, formData);
    }

    addDessert(formData: FormData): Observable<any> {
        return this.http.post(API_DESSERTS, formData);
    }

    deletePizza(pizzaId: string): Observable<any> {
        const url = API_PIZZAS + "/" + pizzaId;
        return this.http.delete(url);
    }
    deleteSalad(saladId: string): Observable<any> {
        const url = API_SALADS + "/" + saladId;
        return this.http.delete(url);
    }
    deleteDessert(dessertId: string): Observable<any> {
        const url = API_DESSERTS + "/" + dessertId;
        return this.http.delete(url);
    }
}