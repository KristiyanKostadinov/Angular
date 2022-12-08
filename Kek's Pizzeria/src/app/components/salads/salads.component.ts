import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-salads',
  templateUrl: './salads.component.html',
  styleUrls: ['./salads.component.css']
})
export class SaladsComponent implements OnInit {

  public salads!: any;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getSalads().subscribe(
      (res: any) => {
        this.salads = res;
      })
  }

  addtocart(item: any) {
    this.service.addtoCart(item);
  }

}
