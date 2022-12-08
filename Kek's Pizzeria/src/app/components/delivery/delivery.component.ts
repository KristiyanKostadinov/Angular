import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/pizza.service';
import { DeliveryModel } from '../../models/delivery.model';
import { DeliveryService } from '../../services/delivery.service';
import { RateDialog } from 'src/app/dialogs/rate-dialog.component';

//form controls
const FNAME: string = "fname";
const LNAME: string = "lname";
const COMPANYNAME: string = "companyname";
const TOWN: string = "town";
const DISTRICT: string = "district";
const STREET: string = "street";
const APARTMENT: string = 'apartment';
const POSTCODE: string = 'postcode';
const PHONE: string = "phone";
const EMAIL: string = "email";
const TANDC: string = "tandc";
const NOTES: string = "notes";
const ORDEREDITEMS: string = "ordereditems";
const PRICE: string = "price";
const CASHORVISA: string = "cashorvisa";
const CARDNUMBER: string = "cardnumber";
const CARDHOLDER: string = "cardholder";
const EXPIRYMONTH: string = "expirymonth";
const EXPIRYYEAR: string = "expiryyear";
const SECURITYCODE: string = "securitycode";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  public discountClear: string = '';
  public orderedPizza: any = [];
  public values: string = '';
  public products: any = [];
  public total: any;
  public deliveryCharge: number = 4.99;
  public sum!: number;
  private letters: RegExp = /^[A-Za-z]+$/;
  private lettersWithSpace: RegExp = /^[A-Za-z\s]+$/;
  private phoneNumber: RegExp = /^-?(0|[+1-9]\d*)?$/;
  private numbers: RegExp = /^-?(0|[1-9]\d*)?$/;
  private numberWithSpace: RegExp = /^(|[0-9]\s*)+$/;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private detailsForm = new FormGroup({});
  public districts: string[] = [
    "Asparuhovo (Varna)",
    "Vladislav Varnenchik (Varna)",
    "Vazrazhdane (Varna)",
    "Galata (Varna)",
    "Grutskata (Varna)",
    "Kaisieva gradina (Varna)",
    "Kolkhozen (Varna)",
    "Maksuda (Varna)",
    "Mladost (Varna)",
    "Pobeda (Varna)",
    "Rakitnika (Varna)",
    "St. Ivan Rilski (Varna)",
    "Troshevo (Varna)",
    "Hristo Botev (Varna)",
    "Flower District (Varna)",
    "Center (Varna)"
  ];

  constructor(private cartService: CartService, public dialog: MatDialog, private deliveryService: DeliveryService) { }

  ngOnInit(): void {

    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.products.forEach((res: any) => this.orderedPizza.push(res.name));
        this.sum = this.cartService.getTotalPrice();
        this.sum = Math.round(this.sum * 100) / 100;
        this.total = (this.sum + this.deliveryCharge).toFixed(2);
      });

    this.detailsForm = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern(this.letters)]),
      lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern(this.letters)]),
      companyname: new FormControl(''),
      town: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      apartment: new FormControl('', Validators.required),
      postcode: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.pattern(this.phoneNumber), Validators.minLength(10), Validators.required]),
      email: new FormControl('', [Validators.pattern(this.emailValidation), Validators.required]),
      notes: new FormControl(''),
      ordereditems: new FormControl(this.orderedPizza, Validators.required),
      price: new FormControl(this.total, Validators.required),
      cashorvisa: new FormControl('', Validators.required),
      cardnumber: new FormControl(''),
      cardholder: new FormControl(''),
      expirymonth: new FormControl(''),
      expiryyear: new FormControl(''),
      securitycode: new FormControl(''),
      tandc: new FormControl('', Validators.required)
    });

    this.detailsForm.get(CASHORVISA)!.valueChanges.subscribe(value => this.setRequired(value));
  }

  public order(delivery: DeliveryModel) {

    this.deliveryService.placeOrder(
      delivery.fname,
      delivery.lname,
      delivery.town,
      delivery.district,
      delivery.street,
      delivery.apartment,
      delivery.postcode,
      delivery.phone,
      delivery.email,
      delivery.tandc,
      delivery.ordereditems,
      delivery.price,
      delivery.cashorvisa,
      delivery.cardnumber,
      delivery.cardholder,
      delivery.expirymonth,
      delivery.expiryyear,
      delivery.securitycode,
      delivery.companyname,
      delivery.notes
    );
    this.resett();
  }

  public resett(): void {
    Object.keys(this.detailsForm.controls).forEach((key) => {
      this.detailsForm.get(key)!.reset();
      this.detailsForm.get(key)!.enable({ onlySelf: true });
    });
    this.products.length = 0
    this.sum = 0;
    this.total = 0;
    this.values = '';
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptycart() {
    this.cartService.removeAllCart();
  }

  onKey(event: any) {
    this.values = event.target.value;
  }

  openDialog(): void {
    this.dialog.open(RateDialog, {
      width: '300px'
    });
  }

  get dform(): FormGroup {
    return this.detailsForm;
  }

  get fname(): AbstractControl {
    return this.detailsForm.get(FNAME)!;
  }

  get lname(): AbstractControl {
    return this.detailsForm.get(LNAME)!;
  }

  get town(): AbstractControl {
    return this.detailsForm.get(TOWN)!;
  }

  get district(): AbstractControl {
    return this.detailsForm.get(DISTRICT)!;
  }

  get street(): AbstractControl {
    return this.detailsForm.get(STREET)!;
  }

  get price(): AbstractControl {
    return this.detailsForm.get(PRICE)!;
  }

  get ordereditems(): AbstractControl {
    return this.detailsForm.get(ORDEREDITEMS)!;
  }

  get apartment(): AbstractControl {
    return this.detailsForm.get(APARTMENT)!;
  }

  get companyname(): AbstractControl {
    return this.detailsForm.get(COMPANYNAME)!;
  }

  get postcode(): AbstractControl {
    return this.detailsForm.get(POSTCODE)!;
  }

  get cardholder(): AbstractControl {
    return this.detailsForm.get(CARDHOLDER)!;
  }

  get cardnumber(): AbstractControl {
    return this.detailsForm.get(CARDNUMBER)!;
  }

  get phone(): AbstractControl {
    return this.detailsForm.get(PHONE)!;
  }

  get email(): AbstractControl {
    return this.detailsForm.get(EMAIL)!;
  }

  get tandc(): AbstractControl {
    return this.detailsForm.get(TANDC)!;
  }

  get notes(): AbstractControl {
    return this.detailsForm.get(NOTES)!;
  }

  get cashorvisa(): AbstractControl {
    return this.detailsForm.get(CASHORVISA)!;
  }

  get expirymonth(): AbstractControl {
    return this.detailsForm.get(EXPIRYMONTH)!;
  }

  get expiryyear(): AbstractControl {
    return this.detailsForm.get(EXPIRYYEAR)!;
  }

  get securitycode(): AbstractControl {
    return this.detailsForm.get(SECURITYCODE)!;
  }

  setRequired(makeRequired: string): void {
    const cardholder = this.cardholder;
    const cardnumber = this.cardnumber;
    const expirymonth = this.expirymonth;
    const expiryyear = this.expiryyear;
    const securitycode = this.securitycode;
    if (makeRequired === 'card') {
      cardholder!.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(35), Validators.pattern(this.lettersWithSpace)]);
      cardnumber!.setValidators([Validators.required, Validators.minLength(16), Validators.pattern(this.numberWithSpace)]);
      expirymonth!.setValidators([Validators.required, Validators.min(1), Validators.max(12), Validators.pattern(this.numbers)]);
      expiryyear!.setValidators([Validators.required, Validators.min(2010), Validators.max(2050), Validators.pattern(this.numbers)]);
      securitycode!.setValidators([Validators.required, Validators.min(0), Validators.maxLength(4), Validators.pattern(this.numbers)]);
    } else {
      cardholder!.clearValidators();
      cardnumber!.clearValidators();
      expirymonth!.clearValidators();
      expiryyear!.clearValidators();
      securitycode!.clearValidators();
    }
    cardholder!.updateValueAndValidity();
    cardnumber!.updateValueAndValidity();
    expirymonth!.updateValueAndValidity();
    expiryyear!.updateValueAndValidity();
    securitycode!.updateValueAndValidity();
  }
}