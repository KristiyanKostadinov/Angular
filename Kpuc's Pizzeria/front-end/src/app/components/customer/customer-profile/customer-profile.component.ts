import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { RateService } from 'src/app/services/rate.service';
import { UserService } from 'src/app/services/user.service';
import { RateDialog } from 'src/app/shared/dialogs/rate-dialog/rate-dialog.component';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  public typeOfLogin: any;
  public selectedTab: number = 0;
  public user: any;
  public userOrdersData: any;
  public userDetails: any;
  companyInfo: any;

  constructor(public dialog: MatDialog, private companyInfoService: CompanyInfoService, private rateService: RateService, private translate: TranslateService, private authService: AuthService, private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.getUser();
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
  // reorder() {
  //   const currentDateTime = new Date();
  //   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //   const day = currentDateTime.getDate();
  //   const month = monthNames[currentDateTime.getMonth()];
  //   const year = currentDateTime.getFullYear();
  //   const hours = currentDateTime.getHours();
  //   const minutes = currentDateTime.getMinutes();

  //   const ordinalSuffix = this.getOrdinalSuffix(day);
  //   const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;

  //   console.log("inOrder", this.userOrdersData);

  //   const order: any = {
  //     date: formattedDateTime,
  //     user_id: this.userOrdersData.user_id,
  //     name: this.userOrdersData.name,
  //     l_name: this.userOrdersData.l_name,
  //     address: this.userOrdersData.address,
  //     email: this.userOrdersData.email,
  //     phone: this.userOrdersData.phone,
  //     ordered_items: this.userOrdersData.ordered_items,
  //     price: this.userOrdersData.price,
  //     paid_by: this.userOrdersData.paid_by,
  //     description: this.userOrdersData.description,
  //     status: "Pending"
  //   };

  //   this.cartService.placeOrder(order)
  //     .subscribe(
  //       () => {
  //         console.log('Order placed successfully');
  //       },
  //       (error) => {
  //         console.error('Error placing order:', error);
  //       }
  //     );
  // }

  getOrdinalSuffix(day: any) {
    if (day >= 11 && day <= 13) {
      return this.translate.instant('th');
    }

    switch (day % 10) {
      case 1:
        return this.translate.instant('st');
      case 2:
        return this.translate.instant('nd');
      case 3:
        return this.translate.instant('rd');
      default:
        return this.translate.instant('th');
    }
  }

  checkOrderHistoryTab() {
    this.selectedTab = 1;
  }

  checkAboutTab() {
    this.selectedTab = 0;
  }

  getUser() {
    this.authService.getLoggedInUser().subscribe((user: any) => {
      this.user = user;
      this.cartService.getUserOrder(this.user._id).subscribe(res => {
        this.userOrdersData = res;
        const firstOrder = this.userOrdersData[0];
        if (firstOrder) {
          this.userDetails = {
            name: firstOrder.name,
            l_name: firstOrder.l_name,
            phone: firstOrder.phone,
            address: firstOrder.address
          };
        }
      });
    });
  }

  reorder(order: any) {
    const currentDateTime = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = currentDateTime.getDate();
    const month = this.translate.instant(monthNames[currentDateTime.getMonth()]);
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const ordinalSuffix = this.getOrdinalSuffix(day);
    const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;

    const newOrder: any = {
      ...order, // Copy existing order properties
      date: formattedDateTime, // Add the current date and time
    };

    delete newOrder._id; // Remove the existing order ID

    this.cartService.placeOrder(newOrder)
      .subscribe(
        () => {
          console.log('Order placed successfully');
        },
        (error) => {
          console.error('Error placing order:', error);
        }
      );
  }


  openDialog(): void {
    this.dialog.open(RateDialog, {
      width: '400px',
      data: {
        rateMethod: this.rate.bind(this)
      }
    });
  }

  rate() {
    const currentDateTime = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = currentDateTime.getDate();
    const month = this.translate.instant(monthNames[currentDateTime.getMonth()]);
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const ordinalSuffix = this.getOrdinalSuffix(day);
    const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;

    const rate = {
      date: formattedDateTime,
      user_id: this.user._id,
      name: this.userDetails.name,
      l_name: this.userDetails.l_name,
      address: this.userDetails.address,
      email: this.user.email,
      phone: this.userDetails.phone,
      comment: this.rateService.getComment(),
      rate: this.rateService.getRate()
    }

    this.rateService.createRate(rate).subscribe(
      () => {
        console.log('Rate created successfully');
      },
      (error) => {
        console.error('Error creating rate:', error);
      }
    );
  }

}
