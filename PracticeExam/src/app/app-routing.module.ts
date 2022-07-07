import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {FollowusComponent} from "./components/followus/followus.component";
import {PricingComponent} from "./components/pricing/pricing.component";
import {TableComponent} from "./components/pricing/table/table.component";
import {FollowersComponent} from "./components/followers/followers.component";
import {FollowersResolver} from "./resolvers/followers.resolver";
import {PricesResolver} from "./resolvers/prices.resolver";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "followus", component: FollowusComponent},
  {path: "pricing", component: PricingComponent, resolve:{data: PricesResolver}},
  {path: "followers", component: FollowersComponent, resolve:{data: FollowersResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [HomeComponent, FollowusComponent, PricingComponent, TableComponent];
