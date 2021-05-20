import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Payment} from "../payment";
import {PaymentComponent} from "../payment.component";
import {PaymentService} from "../payment.service";
import {log} from "util";

@Component({
  selector: 'app-add-edit-payment',
  templateUrl: './add-edit-payment.component.html',
  styleUrls: ['./add-edit-payment.component.scss']
})
export class AddEditPaymentComponent implements OnInit {

  payment: Payment = new Payment();
  id: number;
  paymentForm: FormGroup;
  paymentFormControl: FormControl;

  constructor(public dialogRef: MatDialogRef<PaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private paymentService: PaymentService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.paymentFormControl = new FormControl(this.payment.paymentMethod, [
      Validators.required
    ]);
    this.paymentForm = new FormGroup({
      id: new FormControl(this.payment.id),
      paymentMethod: this.paymentFormControl,
    });
    if (this.data.id) {
      this.paymentService.getById(this.data.id).subscribe(res => {
        const data = res;
        this.paymentForm.patchValue({
          id: data.id,
          paymentMethod: data.paymentMethod,
        });
      });
    }
  }

  saveData() {
    this.paymentService.save(this.paymentForm.getRawValue()).subscribe(
      res => {
        this.snackBar.open(res.message);
      },
      error => {
        this.snackBar.open(error.message);
      }
    );
  }

  updateData() {
    this.paymentService.update(this.paymentForm.getRawValue()).subscribe(
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
}
