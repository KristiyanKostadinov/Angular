import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from 'src/app/services/products.service';
import { RateService } from 'src/app/services/rate.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public typeOfLogin: any;
  public reviewForm!: FormGroup;
  public currentRating: number = 0;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private translate: TranslateService, private rateService: RateService) {
  }

  ngOnInit(): void {
    this.typeOfLogin = localStorage.getItem("typeOfLogin");

    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      rate: ['', Validators.required],
      comment: ['', Validators.required]
    });
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

  addReview() {
    const rating = this.currentRating;
    this.rateService.setRate(rating);

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
      name: this.reviewForm.get("name")!.value,
      email: this.reviewForm.get("email")!.value,
      comment: this.reviewForm.get("comment")!.value,
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

  reset() {
    this.reviewForm.reset();
  }

}
