import {Component, OnInit} from '@angular/core';
import {BookingService} from "../booking/bookin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrls: ['./booking-payment.component.scss']
})
export class BookingPaymentComponent implements OnInit {
  data: any;
  paymentMethods: any;
  reservationId: number;
  paymentMethodFormControl: FormControl;
  paymentForm: FormGroup;

  constructor(private bookingService: BookingService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.getReservationInfo();
    this.getPaymentMethods();
    this.paymentMethodFormControl = new FormControl('', [Validators.required]);

    this.paymentForm = new FormGroup({
      paymentMethod: this.paymentMethodFormControl,
    })
  }

  private getReservationInfo() {
    this.reservationId = +this.route.snapshot.paramMap.get('id');
    this.bookingService.getReservationInfo(this.reservationId).subscribe(res => {
      this.data = res;
    });
  }

  confirm() {
    let rawValue = this.paymentForm.getRawValue();
    rawValue.reservationId = this.data.reservationDto.id;
    this.bookingService.pay(rawValue).subscribe(
      res => {
        this.snackBar.open(res.message);
        this.router.navigate(['user/history']);
      },
      error => {
        this.snackBar.open(error.message);
      }
    );
  }

  getPaymentMethods() {
    this.bookingService.getPaymentMethods().subscribe(res => {
      this.paymentMethods = res;
    })
  }
}
