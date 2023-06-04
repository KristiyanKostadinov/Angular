import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PreviewUserComponent } from './components/preview-user/preview-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "login", component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'preview/:id', component: PreviewUserComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'add', component: AddUserComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
