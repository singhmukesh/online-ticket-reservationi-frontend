import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AdminComponent} from './admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MenuListItemComponent} from './menu-list-item/menu-list-item.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CKEditorModule} from 'ngx-ckeditor';
import {PaymentComponent} from './components/payment/payment.component';
import {EventComponent} from './components/event/event.component';
import {AddEditEventComponent} from './components/event/add-edit-event/add-edit-event.component';
import {AddEditPaymentComponent} from "./components/payment/add-edit-payment/add-edit-payment.component";
import {CurrenciesComponent} from "./components/currencies/currencies.component";
import {MatDividerModule} from "@angular/material/divider";
import {AddEditCurrencyComponent} from "./components/currencies/add-edit-currency/add-edit-currency.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";
import { ReservationComponent } from './components/reservation/reservation.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingPaymentComponent } from './components/booking-payment/booking-payment.component';


@NgModule({
  declarations: [
    AdminComponent,
    MenuListItemComponent,
    PaymentComponent,
    EventComponent,
    AddEditEventComponent,
    AddEditPaymentComponent,
    CurrenciesComponent,
    AddEditCurrencyComponent,
    ReservationComponent,
    BookingComponent,
    BookingPaymentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    CKEditorModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}]
})
export class AdminModule {
}
