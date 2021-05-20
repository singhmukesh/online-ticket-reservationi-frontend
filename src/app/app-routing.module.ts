import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {AdminModule} from './admin/admin.module';
import {AuthGuardService} from './auth-guard/auth-guard.service';

const routes: Routes = [
  {path: 'admin/login', component: LoginPageComponent},
  {path: 'admin', loadChildren: () => AdminModule, canActivateChild: [AuthGuardService]},
  {path: '**', redirectTo: "/admin/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
