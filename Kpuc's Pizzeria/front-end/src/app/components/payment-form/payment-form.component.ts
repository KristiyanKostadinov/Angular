import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  form: any;

  constructor(
    private fb: FormBuilder,
  ) {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      creditCard: [],
      creditCardDate: [],
      creditCardCvv: [],
    });
  }
}