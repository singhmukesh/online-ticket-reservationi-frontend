import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEditCurrencyComponent} from './add-edit-currency/add-edit-currency.component';
import {CurrenciesService} from './currencies.service';
import {Currency} from './currency';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements AfterViewInit {
  currencies: Currency[] = [];
  displayedColumns: string[] = ['id', 'currencyName', 'displayName', 'currencyCode', 'currencySymbol', 'actions'];

  dataSource: MatTableDataSource<Currency> = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  isDataFound = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private currenciesService: CurrenciesService, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) {
  }

  currencyDialog(title?: string, id?: number): void {
    const dialogRef = this.dialog.open(AddEditCurrencyComponent, {
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
          return this.currenciesService.fetchPage(this.sort.active, this.sort.direction,
            this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.data.total;
          this.cdRef.detectChanges();
          return data.data.list;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isDataFound = false;
          this.cdRef.detectChanges();
          return this.currencies;
        })
      ).subscribe(data => {
      this.isDataFound = this.resultsLength != 0;
      this.dataSource = new MatTableDataSource(data);
      this.cdRef.detectChanges();
    });
  }

  deleteCurrency(id: number, currencyName: string) {
    this.snackBar.open('Are you Sure To Delete ' + currencyName, 'Yes', {verticalPosition: 'top'}).onAction().subscribe(() => {
      this.currenciesService.deleteById(id).subscribe(
        res => {
          this.snackBar.open(res.message + ' ' + currencyName);
          this.updateTable();
        },
        error => {
          this.snackBar.open('Could not delete');
        }
      )
    });
  }

  toggleCurrency(id: number) {
    this.currenciesService.toggleFlag(id).subscribe(res => {

    }, error => {
      this.updateTable();
    });
  }
}
