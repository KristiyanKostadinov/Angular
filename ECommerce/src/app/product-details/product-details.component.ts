import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/products';

@Component({
  selector: 'pm-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public productDetail: string = "Product Details: ";
  public product: Product | undefined;
  public errorMessage: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    // this.productDetail = this.productDetail + ": " + id;
    this.productService.getProducts().subscribe();
    if (id) {
      this.getProduct(id);
    }
  }

  public getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(product => { this.product = product });
  }

  public onBack() {
    this.router.navigate(["/products"]);
  }

}