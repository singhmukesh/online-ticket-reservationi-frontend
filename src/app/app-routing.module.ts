import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {AdminModule} from './admin/admin.module';
import {AuthGuardService} from './auth-guard/auth-guard.service';
import {ReservationComponent} from "./admin/components/reservation/reservation.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'bookings', component: ReservationComponent},
  {path: 'user', loadChildren: () => AdminModule, canActivateChild: [AuthGuardService]},
  {path: '**', redirectTo: "/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
