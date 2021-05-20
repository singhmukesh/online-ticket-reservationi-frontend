import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {AdminModule} from './admin/admin.module';
import {AuthGuardService} from './auth-guard/auth-guard.service';
import {BookingComponent} from "./admin/components/booking/booking.component";
import {BookingPaymentComponent} from "./admin/components/booking-payment/booking-payment.component";

const routes: Routes = [
  {path: 'admin/login', component: LoginPageComponent},
  {path: 'book/:id', component: BookingComponent},
  {path: 'pay/:id', component: BookingPaymentComponent},
  {path: 'admin', loadChildren: () => AdminModule, canActivateChild: [AuthGuardService]},
  {path: '**', redirectTo: "/admin/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
