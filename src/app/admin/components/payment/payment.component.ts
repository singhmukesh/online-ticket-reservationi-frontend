import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {merge} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {Payment} from "./payment";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PaymentService} from "./payment.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AddEditPaymentComponent} from "./add-edit-payment/add-edit-payment.component";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource();
  displayedColumns = ['id', 'name','actions'];
  resultsLength = 0;
  isLoadingResults = true;
  isDataFound = true;
  payments: Payment[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private paymentService: PaymentService, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) {
  }

  paymentDialog(title?: string, id?: number): void {
    const dialogRef = this.dialog.open(AddEditPaymentComponent, {
      width: '50vw',
      data: {title: title, id: id}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.updateTable();
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.updateTable();
  }

  updateTable() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.cdRef.detectChanges();
          return this.paymentService.fetchPage(this.sort.active, this.sort.direction,
            this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total;
          this.cdRef.detectChanges();
          return data.paymentDtos;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isDataFound = false;
          this.cdRef.detectChanges();
          return this.payments;
        })
      ).subscribe(data => {
      this.isDataFound = this.resultsLength != 0;
      this.dataSource = new MatTableDataSource(data);
      this.cdRef.detectChanges();
    });
  }

  deletePayment(id: number, payment: string) {
    this.snackBar.open('Are you Sure To Delete ' + payment, 'Yes', {verticalPosition: 'top'}).onAction().subscribe(() => {
      this.paymentService.deleteById(id).subscribe(
        res => {
          this.snackBar.open(res + ' ' + payment);
          this.updateTable();
        },
        error => {
          this.snackBar.open('Could not delete');
        }
      )
    });
  }
}
