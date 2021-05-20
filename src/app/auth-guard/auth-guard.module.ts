import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {authInterceptorProviders} from './auth.interceptor';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {AuthGuardService} from './auth-guard.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [authInterceptorProviders, AuthService, TokenStorageService, AuthGuardService]
})
export class AuthGuardModule {
}
