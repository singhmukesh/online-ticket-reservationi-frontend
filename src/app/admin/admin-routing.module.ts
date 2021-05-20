import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from './admin.component';
import {EventComponent} from "./components/event/event.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {CurrenciesComponent} from "./components/currencies/currencies.component";
import {ReservationComponent} from "./components/reservation/reservation.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'dashboard', component: CurrenciesComponent},
      {path: 'events', component: EventComponent},
      {path: 'ticket', component: EventComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'reservation', component: EventComponent},
      {path: 'booking', component: ReservationComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
