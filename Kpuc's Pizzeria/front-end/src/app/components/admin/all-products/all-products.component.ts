import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  public typeOfLogin: any;
  public employees: any;
  public position: any;
  public allProducts: any[] = []; // New array to hold all products

  constructor(private users: UserService, private productsService: ProductsService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.getEmployees();
    this.position = localStorage.getItem("position");

    this.getAllProducts();
  }

  getEmployees() {
    this.users.getEmployees().subscribe((res) => {
      this.employees = res;
    });
  }

  getAllProducts() {
    this.productsService.getPizzas().subscribe((pizzas: any) => {
      this.productsService.getSalads().subscribe((salads: any) => {
        this.productsService.getDesserts().subscribe((desserts: any) => {
          this.allProducts = [...Object.values(pizzas), ...Object.values(salads), ...Object.values(desserts)];
          console.log(this.allProducts);
        });
      });
    });
  }

  deletePizza(pizzaId: any) {
    this.productsService.deletePizza(pizzaId).subscribe(
      (res) => {
        this.getAllProducts();
      }
    );
  }

  deleteSalad(saladId: any) {
    this.productsService.deleteSalad(saladId).subscribe(
      (res) => {
        this.getAllProducts();
      }
    );
  }

  deleteDessert(dessertId: any) {
    this.productsService.deleteDessert(dessertId).subscribe(
      (res) => {
        this.getAllProducts();
      }
    );
  }

}
