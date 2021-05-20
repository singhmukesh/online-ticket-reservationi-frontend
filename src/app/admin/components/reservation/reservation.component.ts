import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {merge} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {EventType} from "../event/enum/EventType";
import {EventService} from "../event/event.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements AfterViewInit {
  eventType = EventType;
  event: Event[] = [];
  displayedColumns: string[] = ['id', 'fromDestination', 'toDestination', 'eventType', 'cost', 'totalAvailableTickets', 'departureDate','actions'];

  dataSource: MatTableDataSource<Event> = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  isDataFound = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private eventService: EventService, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) {
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
          return this.eventService.fetchPage(this.sort.active, this.sort.direction,
            this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total;
          this.cdRef.detectChanges();
          return data.eventDtos;
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

  deleteEvent(id: number, eventName: string) {
    this.snackBar.open('Are you Sure To Delete ' + eventName, 'Yes', {verticalPosition: 'top'}).onAction().subscribe(() => {
      this.eventService.deleteById(id).subscribe(
        res => {
          this.snackBar.open(res.message + ' ' + eventName);
          this.updateTable();
        },
        error => {
          this.snackBar.open('Could not delete');
        }
      )
    });
  }

  book(id) {

  }
}
