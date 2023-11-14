import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  public cityForm!: FormGroup;

  constructor(private router: Router, private cityService: CityService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.cityForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z ]*$/)
      ]),
      area: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      population: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  addNewCity() {
    const newCity: CityModel = this.cityForm.value;
    this.cityService.addCity(newCity);
    this.router.navigateByUrl("/cities");
  }

  backBtn() {
    this.router.navigateByUrl("/cities");
  }

}
