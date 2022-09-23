import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent },
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", redirectTo: "welcome", pathMatch: "full" }
    ]),
    ProductModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }