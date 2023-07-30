import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-famous',
  templateUrl: './famous.component.html',
  styleUrls: ['./famous.component.css']
})
export class FamousComponent implements OnInit {

  public pizzas!: any;
  public typeOfLogin: any;
  public companyInfo: any;
  
  constructor(private service: ProductsService, private companyInfoService: CompanyInfoService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.service.getPizzas().subscribe(
      (res: any) => {
        this.pizzas = res;
        console.log(this.pizzas);
      })
      this.getCompanyInfo();
  }

  addtocart(item: any) {
    this.service.addtoCart(item);
    console.log(item);
  }

  getCompanyInfo() {
    this.companyInfoService.getCompanyInfo().subscribe((res) => {
      // Assuming the response is an array
      if (Array.isArray(res) && res.length > 0) {
        // Check if the first object in the array exists and has the 'name' property
        if (res[0]) {
          this.companyInfo = res[0];
        }
      }
    });
  }

}
