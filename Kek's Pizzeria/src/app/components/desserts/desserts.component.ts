import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent implements OnInit {

  public desserts!: any;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getDesserts().subscribe(
      (res: any) => {
        this.desserts = res;
      })
  }

  addtocart(item: any) {
    this.service.addtoCart(item);
  }

}
