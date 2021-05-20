import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventComponent} from "../event.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Event} from "../event";
import {EventService} from "../event.service";
import {EventType} from "../enum/EventType";

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {
  eventTypes = EventType;
  event: Event = new Event();
  id: number;
  eventForm: FormGroup;
  fromDestinationFormControl: FormControl;
  toDestinationFormControl: FormControl;
  eventTypeFormControl: FormControl;
  totalTicketsFormControl: FormControl;
  departureDateFormControl: FormControl;
  unitCostFormControl: FormControl;


  constructor(public dialogRef: MatDialogRef<EventComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private eventService: EventService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.fromDestinationFormControl = new FormControl(this.event.fromDestination, [
      Validators.required
    ]);
    this.toDestinationFormControl = new FormControl(this.event.toDestination, [
      Validators.required
    ]);
    this.eventTypeFormControl = new FormControl(this.event.eventType, [
      Validators.required,
    ]);
    this.totalTicketsFormControl = new FormControl(this.event.totalNumberOfTickets, [
      Validators.required
    ]);
    this.departureDateFormControl = new FormControl(this.event.departureDate, [
      Validators.required
    ]);
    this.unitCostFormControl = new FormControl(this.event.departureDate, [
      Validators.required
    ]);
    this.eventForm = new FormGroup({
      id: new FormControl(this.event.id),
      fromDestination: this.fromDestinationFormControl,
      toDestination: this.toDestinationFormControl,
      eventType: this.eventTypeFormControl,
      totalNumberOfTickets: this.totalTicketsFormControl,
      totalAvailableTickets: this.totalTicketsFormControl,
      departureDate: this.departureDateFormControl,
      cost: this.unitCostFormControl,
    });
    if (this.data.id) {
      this.eventService.getById(this.data.id).subscribe(res => {
        const data = res.data;
        this.eventForm.patchValue({
          id: data.id,
          fromDestination: data.fromDestination,
          toDestination: data.toDestination,
          eventType: data.eventType,
          totalNumberOfTickets: data.totalNumberOfTickets,
          totalAvailableTickets: data.totalNumberOfTickets,
          departureDate: data.departureDateFormControl,
          cost: this.unitCostFormControl,
        });
      });
    }
  }

  saveData() {
    let rawValue = this.eventForm.getRawValue();
    rawValue.ticketDto = {
      "numberOfTickets": this.totalTicketsFormControl.value,
      "cost": this.unitCostFormControl.value
    }
    this.eventService.save(rawValue).subscribe(res => {
        this.snackBar.open(res.message);
      },
      error => {
        this.snackBar.open(error.message);
      });
  }

  updateData() {
    this.eventService.update(this.eventForm.getRawValue()).subscribe(
      res => {
        this.snackBar.open(res.message);
        this.dialogRef.close();
      },
      error => {
        this.snackBar.open(error.message);
      }
    );
  }

  saveDataAndExit() {
    this.saveData();
    this.dialogRef.close();
  }

  getKeys(eventTypes: any) {
    return Object.keys(eventTypes);
  }
}
