import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {EventType} from "../event/enum/EventType";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {merge} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {ReservationService} from "../reservation/reservation.service";

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements AfterViewInit{

  eventType = EventType;
  event: Event[] = [];
  displayedColumns: string[] = ['fromDestination', 'toDestination', 'eventType', 'cost','departureDate'];

  dataSource: MatTableDataSource<Event> = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  isDataFound = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private reservationService: ReservationService, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) {
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
          return this.reservationService.fetchPage(this.sort.active, this.sort.direction,
            this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total;
          this.cdRef.detectChanges();
          return data.bookingInfoDtos;
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.isDataFound = false;
          this.cdRef.detectChanges();
          return this.event;
        })
      ).subscribe(data => {
      this.isDataFound = this.resultsLength != 0;
      this.dataSource = new MatTableDataSource(data);
      this.cdRef.detectChanges();
    });
  }
}
