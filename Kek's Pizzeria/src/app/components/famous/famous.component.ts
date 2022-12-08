import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/pizza.service';

@Component({
  selector: 'app-famous',
  templateUrl: './famous.component.html',
  styleUrls: ['./famous.component.css']
})
export class FamousComponent implements OnInit {

  public pizzas!: any;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getPizzas().subscribe(
      (res: any) => {
        this.pizzas = res;
      })
  }

  addtocart(item: any) {
    this.service.addtoCart(item);
  }

}
