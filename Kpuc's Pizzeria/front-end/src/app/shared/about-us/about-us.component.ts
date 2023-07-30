import { Component, OnInit } from '@angular/core';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  public typeOfLogin: any;
  public companyInfo: any;

  constructor(private companyInfoService: CompanyInfoService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.getCompanyInfo();
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
