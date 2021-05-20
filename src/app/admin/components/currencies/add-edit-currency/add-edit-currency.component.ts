import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../currency';
import {CurrenciesComponent} from '../currencies.component';
import {CurrenciesService} from '../currencies.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-currency',
  templateUrl: './add-edit-currency.component.html',
  styleUrls: ['./add-edit-currency.component.scss']
})
export class AddEditCurrencyComponent implements OnInit {
  currency: Currency;
  id: number;
  currencyForm: FormGroup;
  currencyNameFormControl: FormControl;
  displayNameFormControl: FormControl;
  currencyCodeFormControl: FormControl;
  currencySymbolFormControl: FormControl;
  currencyEnableFormControl: FormControl;


  constructor(public dialogRef: MatDialogRef<CurrenciesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private currenciesService: CurrenciesService, private snackBar: MatSnackBar) {
    this.currency = {
      id: data.id,
      currencyName: '',
      displayName: '',
      currencyCode: '',
      currencySymbol: '',
      enable: true
    }
  }

  ngOnInit(): void {
    this.currencyNameFormControl = new FormControl(this.currency.currencyName, [
      Validators.required
    ]);
    this.displayNameFormControl = new FormControl(this.currency.displayName, [
      Validators.required
    ]);
    this.currencyCodeFormControl = new FormControl(this.currency.currencyCode, [
      Validators.required,
      Validators.pattern('^[A-Z]{3}')
    ]);
    this.currencySymbolFormControl = new FormControl(this.currency.currencySymbol, [
      Validators.required
    ]);
    this.currencyEnableFormControl = new FormControl(this.currency.enable ? 'true' : 'false');

    this.currencyForm = new FormGroup({
      id: new FormControl(this.currency.id),
      currencyName: this.currencyNameFormControl,
      displayName: this.displayNameFormControl,
      currencyCode: this.currencyCodeFormControl,
      currencySymbol: this.currencySymbolFormControl,
      enable: this.currencyEnableFormControl
    });
    if (this.data.id) {
      this.currenciesService.getById(this.data.id).subscribe(res => {
        const data = res.data;
        this.currencyForm.patchValue({
          id: data.id,
          currencyName: data.currencyName,
          displayName: data.displayName,
          currencyCode: data.currencyCode,
          currencySymbol: data.currencySymbol,
          enable: data.enable.toString()
        });
      });
    }
  }

  saveData() {
    this.currenciesService.save(this.currencyForm.getRawValue()).subscribe(
      res => {
        this.snackBar.open(res.message);
      },
      error => {
        this.snackBar.open(error.message);
      }
    );
  }

  updateData() {
    this.currenciesService.update(this.currencyForm.getRawValue()).subscribe(
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
