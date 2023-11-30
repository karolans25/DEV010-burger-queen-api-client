import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth/auth.guard';
import { UserListingComponent } from './components/admin/user-listing/user-listing.component';
import { OrderListingComponent } from './components/home/order-listing/order-listing.component';

const routes: Routes = [
  { path: '', component: OrderListingComponent, canActivate: [authGuard]},
  { path: 'order', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserListingComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
