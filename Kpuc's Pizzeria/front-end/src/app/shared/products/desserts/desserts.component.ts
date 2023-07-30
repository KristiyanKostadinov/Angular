import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent implements OnInit {

  public desserts!: any;
  public typeOfLogin: any;
  public companyInfo: any;

  constructor(private service: ProductsService, private companyInfoService: CompanyInfoService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.service.getDesserts().subscribe(
      (res: any) => {
        this.desserts = res;
      })

    this.getCompanyInfo();
  }

  addtocart(item: any) {
    this.service.addtoCart(item);
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
