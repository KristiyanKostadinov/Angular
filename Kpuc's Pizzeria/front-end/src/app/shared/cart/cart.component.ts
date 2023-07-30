import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { RateDialog } from '../dialogs/rate-dialog/rate-dialog.component';
import { RateService } from 'src/app/services/rate.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('cash') cashRef: any;
  @ViewChild('agree') agreeRef: any;

  public typeOfLogin: any;
  public discount: number = 10.00;
  public orderedItems: any = [];
  public existingNames: string[] = [];
  public values: string = '';
  public products: any = [];
  public subtotal: number = 0;
  public deliveryCharge: number = 4.99;
  private letters: RegExp = /^[A-Za-zа-яА-Я]+$/;
  private phoneNumber: RegExp = /^-?(0|[+1-9]\d*)?$/;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public detailsForm!: FormGroup;
  public cardForm!: FormGroup;
  public agreeTouched: boolean = false;
  public paymentMethod: string = "cash";
  private user_id!: any;
  public couponCode: string = '';
  public couponDiscount: number = 0;

  constructor(private cartService: CartService, private translate: TranslateService, private authService: AuthService, private rateService: RateService, public dialog: MatDialog, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");

    this.calculateSubtotal();

    this.authService.getLoggedInUser().subscribe(userId => {
      this.user_id = userId._id;
    })

    this.productsService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.existingNames = this.products.map((res: any) => res.name);
      });

    for (let item of this.products) {
      this.subtotal += item.price * item.quantity;
      this.subtotal = Math.round(this.subtotal * 100) / 100;
      this.subtotal.toFixed(2);
    }

    this.cardForm = new FormGroup({
      creditCardName: new FormControl('', [Validators.required]),
      creditCard: new FormControl('', [Validators.required, Validators.minLength(16)]),
      creditCardDate: new FormControl('', Validators.required),
      creditCardCvv: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.detailsForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern(this.letters)]),
      l_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern(this.letters)]),
      phone: new FormControl('', [Validators.pattern(this.phoneNumber), Validators.minLength(10), Validators.required]),
      email: new FormControl('', [Validators.pattern(this.emailValidation), Validators.required]),
      address: new FormControl('', [Validators.minLength(10), Validators.required]),
      description: new FormControl('')
    });
  }

  removeItem(item: any) {
    this.productsService.removeCartItem(item);
    if (this.products.length > 0) {
      this.subtotal -= item.price * item.quantity;
      this.subtotal = Math.round(this.subtotal * 100) / 100;
      this.subtotal.toFixed(2);
    } else {
      this.subtotal = 0;
    }
  }

  calculateSubtotal() {
    this.subtotal = 0;
    for (let item of this.products) {
      this.subtotal += item.price * item.quantity;
    }
    this.subtotal = Math.round(this.subtotal * 100) / 100;
  }

  calculateTotal() {
    if (this.subtotal === 0) {
      return '0.00';
    }

    if (this.subtotal > 50) {
      return this.subtotal;
    }

    // Calculate total by adding subtotal, coupon discount, and delivery charge
    const total = this.subtotal - this.couponDiscount + this.deliveryCharge;
    return total.toFixed(2);
  }

  // applyCouponCode() {

  //   // Call the coupon service to validate the coupon code and retrieve coupon details
  //   const couponDetails = this.couponService.validateCouponCode(this.couponCode);

  //   if (couponDetails.valid) {
  //     // Apply the coupon discount to the total
  //     this.couponDiscount = couponDetails.discount;
  //   } else {
  //     // Invalid coupon code
  //     this.couponDiscount = 0;
  //   }
  // }

  increaseOne(item: any) {
    const index = this.products.findIndex((p: any) => p.name === item.name);
    const previousQuantity = this.products[index].quantity;
    this.products[index].quantity++;
    if (this.products[index].quantity > previousQuantity) {
      const quantityDiff = this.products[index].quantity - previousQuantity;
      this.subtotal += this.products[index].price * quantityDiff;
      this.subtotal = Math.round(this.subtotal * 100) / 100;
      this.subtotal.toFixed(2);
    }
  }

  decreaseOne(item: any) {
    const index = this.products.findIndex((p: any) => p.name === item.name);
    if (this.products[index].quantity > 1) {
      const previousQuantity = this.products[index].quantity;
      this.products[index].quantity--;
      const quantityDiff = previousQuantity - this.products[index].quantity;
      this.subtotal -= this.products[index].price * quantityDiff;
      this.subtotal = Math.round(this.subtotal * 100) / 100;
      this.subtotal.toFixed(2);
    }
  }

  emptycart() {
    this.productsService.removeAllCart();
  }

  onKey(event: any) {
    this.values = event.target.value;
  }

  openDialog(): void {
    this.dialog.open(RateDialog, {
      width: '400px',
      data: {
        rateMethod: this.rate.bind(this)
      }
    });
  }

  onPaymentMethodChange(value: string) {
    this.paymentMethod = value;
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

  placeOrder() {
    const total_price = this.calculateTotal();
    const currentDateTime = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const day = currentDateTime.getDate();
    const month = this.translate.instant(monthNames[currentDateTime.getMonth()]);
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const ordinalSuffix = this.getOrdinalSuffix(day);
    const formattedDateTime = `${day}${ordinalSuffix} ${month} ${year} ${hours}:${minutes}`;

    const order: any = {
      date: formattedDateTime,
      user_id: this.user_id,
      name: this.detailsForm.get("name")?.value,
      l_name: this.detailsForm.get("l_name")?.value,
      address: this.detailsForm.get("address")?.value,
      email: this.detailsForm.get("email")?.value,
      phone: this.detailsForm.get("phone")?.value,
      ordered_items: this.existingNames.toString(),
      price: total_price,
      paid_by: this.paymentMethod === "cash" ? "cash" : "credit_card",
      description: this.detailsForm.get("description")?.value,
      status: "Pending"
    };

    console.log(order);

    this.cartService.placeOrder(order)
      .subscribe(
        () => {
          console.log('Order placed successfully');
        },
        (error) => {
          console.error('Error placing order:', error);
        }
      );
  }

  submitCart(): void {
    this.placeOrder();
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
      user_id: this.user_id,
      name: this.detailsForm.get("name")?.value,
      l_name: this.detailsForm.get("l_name")?.value,
      address: this.detailsForm.get("address")?.value,
      email: this.detailsForm.get("email")?.value,
      phone: this.detailsForm.get("phone")?.value,
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
    this.reset();
    console.log(this.paymentMethod);
  }

  reset() {
    this.detailsForm.reset();
    // this.cardForm.reset();
    this.agreeTouched = false;
    this.paymentMethod = 'cash';
    this.products.length = 0;
    this.subtotal = 0;
    this.values = '';
  }

  resetVariables() {
    if (this.cashRef) {
      this.cashRef.checked = true;
    }
    if (this.agreeRef) {
      this.agreeRef.checked = false;
    }
  }

}
