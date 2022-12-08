import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HeaderComponent } from './components/header/header.component';
import { FamousComponent } from './components/famous/famous.component';
import { OffersComponent } from './components/offers/offers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DeliveryComponent } from './components/delivery/delivery.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RateDialog } from './dialogs/rate-dialog.component';
import { MenuComponent } from './components/menu/menu.component';
import { SaladsComponent } from './components/salads/salads.component';
import { DessertsComponent } from './components/desserts/desserts.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    HeaderComponent,
    FamousComponent,
    OffersComponent,
    AboutUsComponent,
    HomeComponent,
    DeliveryComponent,
    RateDialog,
    MenuComponent,
    SaladsComponent,
    DessertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
