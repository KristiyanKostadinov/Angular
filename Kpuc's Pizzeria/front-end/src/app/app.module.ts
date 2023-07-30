import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationComponent } from './shared/reservation/reservation.component';
import { HeaderComponent } from './components/header/header.component';
import { FamousComponent } from './shared/products/pizzas/famous.component';
import { OffersComponent } from './components/offers/offers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CartComponent } from './shared/cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuComponent } from './shared/menu/menu.component';
import { SaladsComponent } from './shared/products/salads/salads.component';
import { DessertsComponent } from './shared/products/desserts/desserts.component';
import { LoginComponent } from './components/profile/login/login.component';
import { CreateAccComponent } from './components/profile/create-acc/create-acc.component';
import { ForgotPasswordComponent } from './components/profile/forgot-password/forgot-password.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { OrdersComponent } from './shared/orders/orders.component';
import { ReservationsComponent } from './shared/reservations/reservations.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ViewRatesComponent } from './components/admin/view-rates/view-rates.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { EmployeeHeaderComponent } from './components/employee/employee-header/employee-header.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { CustomerHeaderComponent } from './components/customer/customer-header/customer-header.component';
import { CustomerProfileComponent } from './components/customer/customer-profile/customer-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule, DatePipe } from '@angular/common';
import { RateDialog } from './shared/dialogs/rate-dialog/rate-dialog.component';
import { TableReservationDialogComponent } from './shared/dialogs/table-reservation-dialog/table-reservation-dialog.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsersComponent } from './components/admin/users/users.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { NgxCcModule } from 'ngx-cc';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { OrderByDatePipe } from './shared/pipes/OrderByDateTimePipe.pipe';
import { OrderByNamePipe } from './shared/pipes/OrderByName.pipe';
import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';
import { ReviewComponent } from './components/review/review.component';
import { CompanyInfoComponent } from './components/admin/company-info/company-info.component';
import { AllProductsComponent } from './components/admin/all-products/all-products.component';
import { ProductEditComponent } from './components/admin/product-edit/product-edit.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    HeaderComponent,
    FamousComponent,
    OffersComponent,
    AboutUsComponent,
    HomeComponent,
    CartComponent,
    RateDialog,
    MenuComponent,
    SaladsComponent,
    DessertsComponent,
    LoginComponent,
    CreateAccComponent,
    ForgotPasswordComponent,
    AdminHeaderComponent,
    OrdersComponent,
    ReservationsComponent,
    AdminHomeComponent,
    ViewRatesComponent,
    EmployeeHomeComponent,
    EmployeeHeaderComponent,
    AddProductComponent,
    CustomerHeaderComponent,
    CustomerProfileComponent,
    TableReservationDialogComponent,
    UsersComponent,
    PaymentFormComponent,
    AdminsComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    OrderByDatePipe,
    OrderByNamePipe,
    AddAdminComponent,
    ReviewComponent,
    CompanyInfoComponent,
    AllProductsComponent,
    ProductEditComponent
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
    MatTabsModule,
    CommonModule,
    NgxCcModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
