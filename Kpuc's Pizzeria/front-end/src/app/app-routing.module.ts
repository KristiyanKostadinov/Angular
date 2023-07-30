import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './shared/reservation/reservation.component';
import { FamousComponent } from './shared/products/pizzas/famous.component';
import { OffersComponent } from './components/offers/offers.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './shared/cart/cart.component';
import { MenuComponent } from './shared/menu/menu.component';
import { SaladsComponent } from './shared/products/salads/salads.component';
import { DessertsComponent } from './shared/products/desserts/desserts.component';
import { CreateAccComponent } from './components/profile/create-acc/create-acc.component';
import { OrdersComponent } from './shared/orders/orders.component';
import { ReservationsComponent } from './shared/reservations/reservations.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ViewRatesComponent } from './components/admin/view-rates/view-rates.component';
import { ForgotPasswordComponent } from './components/profile/forgot-password/forgot-password.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { LoginComponent } from './components/profile/login/login.component';
import { CustomerProfileComponent } from './components/customer/customer-profile/customer-profile.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { AddAdminComponent } from './components/admin/add-admin/add-admin.component';
import { ReviewComponent } from './components/review/review.component';
import { CompanyInfoComponent } from './components/admin/company-info/company-info.component';
import { AllProductsComponent } from './components/admin/all-products/all-products.component';
import { ProductEditComponent } from './components/admin/product-edit/product-edit.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "pizzas", component: FamousComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "cart", component: CartComponent },
  { path: "reservation", component: ReservationComponent },
  { path: "menu", component: MenuComponent },
  { path: "salads", component: SaladsComponent },
  { path: "desserts", component: DessertsComponent },
  { path: "login", component: LoginComponent },
  { path: "orders", component: OrdersComponent },
  { path: "reservations", component: ReservationsComponent },
  { path: "sign-up", component: CreateAccComponent },
  { path: "admin", component: AdminHomeComponent },
  { path: "rates", component: ViewRatesComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "employee", component: EmployeeHomeComponent },
  { path: "profile", component: CustomerProfileComponent },
  { path: "add-product", component: AddProductComponent },
  { path: "add-employee", component: AddEmployeeComponent },
  { path: "add-admin", component: AddAdminComponent },
  { path: "users", component: UsersComponent },
  { path: "admins", component: AdminsComponent },
  { path: "review", component: ReviewComponent },
  { path: "employees", component: EmployeesComponent },
  { path: "company-info", component: CompanyInfoComponent },
  { path: "all-products", component: AllProductsComponent },
  { path: 'edit-product/:productId', component: ProductEditComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

