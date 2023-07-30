import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  typeOfLogin: any;
  orders: any;
  position: any;
  user: any;

  constructor(private cartService: CartService, private authService: AuthService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");
    this.getOrders();
    this.position = localStorage.getItem("position");
    this.userInfo();
  }

  userInfo() {
    this.authService.getLoggedInUser().subscribe(
      (res) => {
        this.user = res;
        console.log(this.user.name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getOrders() {
    this.cartService.getOrders().subscribe((orders: any) => {
      this.orders = orders;
    });
  }

  public acceptOrder(id: any) {
    const currentDateTime = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = currentDateTime.getDate();
    const month = this.translate.instant(monthNames[currentDateTime.getMonth()]);
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const ordinalSuffix = this.getOrdinalSuffix(day);
    const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;

    const updatedData = {
      status: 'In Process',
      accepted_by: this.user.name,
      accepted_at: formattedDateTime
    };

    this.cartService.getOrder(id).subscribe(
      (order: any) => {
        const updatedOrder = { ...order, ...updatedData };
        console.log(updatedOrder);
        this.cartService.updateOrder(id, updatedOrder).subscribe(
          () => {
            console.log('Order updated successfully');
            this.getOrders();
            // Optionally, you can update the orders array or perform any other actions
          },
          (error) => {
            console.error('Failed to update the order:', error);
            // Handle error, e.g., show an error message or handle specific error cases
          }
        );
      },
      (error) => {
        console.error('Failed to fetch the order:', error);
        // Handle error, e.g., show an error message or handle specific error cases
      }
    );
  }

  public completedOrder(id: any) {

    const currentDateTime = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = currentDateTime.getDate();
    const month = this.translate.instant(monthNames[currentDateTime.getMonth()]);
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const ordinalSuffix = this.getOrdinalSuffix(day);
    const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;

    const updatedData = {
      status: 'Ready',
      accepted_by: this.user.name,
      ready_at: formattedDateTime
    };

    this.cartService.getOrder(id).subscribe(
      (order: any) => {
        const updatedOrder = { ...order, ...updatedData };
        console.log(updatedOrder);
        this.cartService.updateOrder(id, updatedOrder).subscribe(
          () => {
            console.log('Order updated successfully');
            this.getOrders();
            // Optionally, you can update the orders array or perform any other actions
          },
          (error) => {
            console.error('Failed to update the order:', error);
            // Handle error, e.g., show an error message or handle specific error cases
          }
        );
      },
      (error) => {
        console.error('Failed to fetch the order:', error);
        // Handle error, e.g., show an error message or handle specific error cases
      }
    );
  }

  public pickedUpOrder(id: any) {

    const currentDateTime = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = currentDateTime.getDate();
    const month = this.translate.instant(monthNames[currentDateTime.getMonth()]);
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const ordinalSuffix = this.getOrdinalSuffix(day);
    const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;


    const updatedData = {
      status: 'Picked up and heading towards you',
      delivered_by: this.user.name,
      picked_up_at: formattedDateTime
    };

    this.cartService.getOrder(id).subscribe(
      (order: any) => {
        const updatedOrder = { ...order, ...updatedData };
        console.log(updatedOrder);
        this.cartService.updateOrder(id, updatedOrder).subscribe(
          () => {
            console.log('Order updated successfully');
            this.getOrders();
            // Optionally, you can update the orders array or perform any other actions
          },
          (error) => {
            console.error('Failed to update the order:', error);
            // Handle error, e.g., show an error message or handle specific error cases
          }
        );
      },
      (error) => {
        console.error('Failed to fetch the order:', error);
        // Handle error, e.g., show an error message or handle specific error cases
      }
    );
  }

  public deliveredOrder(id: any) {

    const currentDateTime = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = currentDateTime.getDate();
    const month = this.translate.instant(monthNames[currentDateTime.getMonth()]);
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const ordinalSuffix = this.getOrdinalSuffix(day);
    const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;

    const updatedData = {
      status: 'Delivered',
      delivered_by: this.user.name,
      delivered_at: formattedDateTime
    };

    this.cartService.getOrder(id).subscribe(
      (order: any) => {
        const updatedOrder = { ...order, ...updatedData };
        console.log(updatedOrder);
        this.cartService.updateOrder(id, updatedOrder).subscribe(
          () => {
            console.log('Order updated successfully');
            this.getOrders();
            // Optionally, you can update the orders array or perform any other actions
          },
          (error) => {
            console.error('Failed to update the order:', error);
            // Handle error, e.g., show an error message or handle specific error cases
          }
        );
      },
      (error) => {
        console.error('Failed to fetch the order:', error);
        // Handle error, e.g., show an error message or handle specific error cases
      }
    );
  }

  deleteOrder(id: any) {
    this.cartService.deleteOrder(id).subscribe(
      () => {
        console.log('Order deleted successfully');
        this.getOrders(); // Refresh the orders after the deletion
      },
      (error) => {
        console.error('Failed to delete the order:', error);
        // Handle error, e.g., show an error message or handle specific error cases
      }
    );
  }


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
}
