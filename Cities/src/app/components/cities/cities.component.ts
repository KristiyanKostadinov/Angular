import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  public cities: CityModel[] = [];
  public searchTerm: string = '';

  constructor(private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
    this.cityService.cities$.subscribe((res) => {
      this.cities = res;
    });
  }

  navigateToAddCity() {
    this.router.navigateByUrl('/add-city');
  }

  filterCities(): CityModel[] {
    return this.cities.filter(city => city.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  sortByName(order: "asc" | "desc") {
    this.cities.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (order === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  sortByArea(order: "asc" | "desc") {
    this.cities.sort((a, b) => {
      if (order === 'asc') {
        return a.area - b.area;
      } else {
        return b.area - a.area;
      }
    })
  }

  sortByPopulation(order: "asc" | "desc") {
    this.cities.sort((a, b) => {
      if (order === 'asc') {
        return a.population - b.population;
      } else {
        return b.population - a.population;
      }
    })
  }
}

