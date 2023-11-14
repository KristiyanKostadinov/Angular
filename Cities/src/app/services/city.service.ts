import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityModel } from '../models/city.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesUrl: string = 'assets/cities.json';
  public cities$ = new BehaviorSubject<CityModel[]>([]);

  constructor(private http: HttpClient) {
    this.fetchCities();
  }

  fetchCities() {
    this.http.get<CityModel[]>(this.citiesUrl).subscribe((cities) => {
      const citiesWithDensity = cities.map((city) => ({
        ...city,
        density: Math.floor(city.population / city.area)
      }));

      this.cities$.next(citiesWithDensity);
    });
  }

  addCity(newCity: CityModel) {
    const newCityWithDensity = {
      ...newCity,
      density: Math.floor(newCity.population / newCity.area)
    }

    const updatedCities = [...this.cities$.value, newCityWithDensity];
    this.cities$.next(updatedCities);
  }
}
