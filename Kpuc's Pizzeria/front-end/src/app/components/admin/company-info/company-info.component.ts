import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { RateService } from 'src/app/services/rate.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  public typeOfLogin: any;
  public companyInfoForm!: FormGroup;
  public currentRating: number = 0;
  public companyInfo: any = {};

  constructor(private formBuilder: FormBuilder, private companyInfoService: CompanyInfoService, private rateService: RateService) {
  }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");

    this.companyInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.getCompanyInfo();
  }


  reset() {
    this.companyInfoForm.reset();
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

  updateCompanyInfo() {
    const companyId = this.companyInfo._id;
    const newInfo = {
      name: this.companyInfo.name,
      email: this.companyInfoForm.get("email")!.value,
      address: this.companyInfoForm.get("address")!.value,
      phone: this.companyInfoForm.get("phone")!.value
    }

    this.companyInfoService.updateCompanyInfo(companyId, newInfo).subscribe(
      (res) => {
        this.getCompanyInfo();
      },
      (error) => {
        console.log(error);
      }
    );
    this.reset();
  }

}
