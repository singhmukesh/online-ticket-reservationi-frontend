import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventType} from "../event/enum/EventType";
import {BookingService} from "./bookin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  eventTypes = EventType;
  nameFormControl: FormControl;
  emailFormControl: FormControl;
  phoneNumberFormControl: FormControl;
  unitCostFormControl: FormControl;
  ticketQuantityFormControl: FormControl;
  totalAmountFormControl: FormControl;
  eventTypeFormControl: FormControl;
  bookingForm: FormGroup;
  totalAvailableTickets: number;
  unitTicketCost: number;
  eventId: number;

  constructor(private bookingService: BookingService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.getEventInfo();
    this.nameFormControl = new FormControl('', [
      Validators.required
    ]);
    this.emailFormControl = new FormControl('', [
      Validators.required
    ]);
    this.phoneNumberFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.unitCostFormControl = new FormControl('', [
      Validators.required
    ]);
    this.ticketQuantityFormControl = new FormControl('', [Validators.required, this.ticketQuantityValidator]);
    this.totalAmountFormControl = new FormControl('', [
      Validators.required
    ]);
    this.eventTypeFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.bookingForm = new FormGroup({
      name: this.nameFormControl,
      email: this.emailFormControl,
      phoneNumber: this.phoneNumberFormControl,
      unitCost: this.unitCostFormControl,
      ticketQuantity: this.ticketQuantityFormControl,
      totalCost: this.totalAmountFormControl,
      eventType: this.eventTypeFormControl,
    });
  }

  book() {

  }

  getKeys(eventTypes: any) {
    return Object.keys(eventTypes);
  }

  private getEventInfo() {
    this.eventId = +this.route.snapshot.paramMap.get('id');
    this.bookingService.getById(this.eventId).subscribe(res => {
      this.totalAvailableTickets = res.totalAvailableTickets;
      this.unitTicketCost = res.ticketDto.cost;
      this.bookingForm.patchValue({
        unitCost: res.ticketDto.cost
      });
    });
  }

  ticketInput(event: KeyboardEvent) {
    // const quantity = +event.target.value;
    const quantity = 12;
    const totalCost = quantity * this.unitTicketCost;
    this.bookingForm.get('totalCost').setValue(totalCost);
  }

  ticketQuantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value) || control.value > 100)) {
      return {'ticketRange': true};
    }
    return null;
  }

  saveBookingData() {
    let rawValue = this.bookingForm.getRawValue();
    rawValue.eventId = this.eventId;
    this.bookingService.save(rawValue).subscribe(
      res => {
        this.router.navigate(['pay',res.id]);
      },
      error => {
        this.snackBar.open(error.message);
      }
    );
  }
}
