import { Component, OnInit } from '@angular/core';
import { ReservationModel } from "../../models/reservation.model";
import { ReservationService } from "../../services/reservation.service";
import { HttpClient } from "@angular/common/http";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { RateDialog } from 'src/app/dialogs/rate-dialog.component';
import { MatDialog } from '@angular/material/dialog';

//form controls
const DATE: string = "date";
const TIME: string = "time";
const NUMBER_OF_PEOPLE: string = "numberPeople";
const NEIGHBORHOOD: string = "neighborhood";
const NAME: string = "name";
const EMAIL: string = "email";
const PHONE: string = 'phone';
const COMMENT: string = 'comment';
const AGREE: string = "agree";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private letters: RegExp = /^[A-Za-z\s]+$/;
  private emailValidation: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private numbers: RegExp = /^-?(0|[+1-9]\d*)?$/;
  private groupForm = new FormGroup({});
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
  public people: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  constructor(private createReservation: ReservationService, private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      numberPeople: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern(this.letters)]),
      email: new FormControl('', [Validators.pattern(this.emailValidation), Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(this.numbers)]),
      agree: new FormControl('', Validators.required),
      comment: new FormControl('')
    });
  }

  public reserve(reservation: ReservationModel) {
    this.createReservation.createReservation(reservation.comment, reservation.date, reservation.email, reservation.name, reservation.neighborhood, reservation.numberPeople, reservation.phone, reservation.time, reservation.agree)
    this.reset();
  }

  public reset(): void {
    Object.keys(this.groupForm.controls).forEach((key) => {
      this.groupForm.get(key)!.reset();
      this.groupForm.get(key)!.enable({ onlySelf: true });
    })
  }

  get form(): FormGroup {
    return this.groupForm;
  }

  get date(): AbstractControl {
    return this.groupForm.get(DATE)!;
  }

  get time(): AbstractControl {
    return this.groupForm.get(TIME)!;
  }

  get numberPeople(): AbstractControl {
    return this.groupForm.get(NUMBER_OF_PEOPLE)!;
  }

  get neighborhood(): AbstractControl {
    return this.groupForm.get(NEIGHBORHOOD)!;
  }

  get name(): AbstractControl {
    return this.groupForm.get(NAME)!;
  }

  get email(): AbstractControl {
    return this.groupForm.get(EMAIL)!;
  }

  get phone(): AbstractControl {
    return this.groupForm.get(PHONE)!;
  }

  get comment(): AbstractControl {
    return this.groupForm.get(COMMENT)!;
  }

  get agree(): AbstractControl {
    return this.groupForm.get(AGREE)!;
  }

  openDialog(): void {
    this.dialog.open(RateDialog, {
      width: '250px'
    });
  }

}
