import { NgModule } from '@angular/core';
import { ProductList } from '../products/product-list.component';
import { ProductListPipe } from '../pipes/product.list.pipe';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ProductDetailsGuard } from '../guards/product-details.guard';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from '../add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BryntumGridModule } from '@bryntum/grid-angular';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ProductListGridComponent } from '../products/product-list-grid/product-list-grid.component';
import { LoginComponent } from '../login/login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@NgModule({
  declarations: [
    ProductList,
    ProductListPipe,
    ProductDetailsComponent,
    AddProductComponent,
    ProductListGridComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: "products", component: ProductList },
      { path: "products/:id", component: ProductDetailsComponent, canActivate: [ProductDetailsGuard] },
      { path: "add-product", component: AddProductComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "login", component: LoginComponent },
      { path: "user-profile", component: UserProfileComponent },
    ]),
    SharedModule,
    ReactiveFormsModule,
    BryntumGridModule,
  ]
})
export class ProductModule { }