import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/cities.component';
import { AddCityComponent } from './components/add-city/add-city.component';

const routes: Routes = [
  { path: "", component: CitiesComponent },
  { path: "cities", component: CitiesComponent },
  { path: "add-city", component: AddCityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
