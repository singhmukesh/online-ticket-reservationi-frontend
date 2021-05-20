import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './login-page/login-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardModule} from './auth-guard/auth-guard.module';
import {AdminModule} from './admin/admin.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDatetimepickerModule, MatNativeDatetimeModule} from "@mat-datetimepicker/core";


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
  ],
  imports: [
    AuthGuardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    AdminModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDatetimeModule,
    MatDatetimepickerModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-EN'},
    {provide: MAT_DATE_LOCALE, useValue: 'en-EN'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
