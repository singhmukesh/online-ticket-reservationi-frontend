import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AddEditEventComponent} from "./add-edit-event/add-edit-event.component";
import {merge} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {EventService} from "./event.service";
import {EventType} from "./enum/EventType";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements AfterViewInit {
  eventType = EventType;
  event: Event[] = [];
  displayedColumns: string[] = ['id', 'fromDestination', 'toDestination', 'eventType', 'totalNumberOfTickets', 'cost', 'totalAvailableTickets', 'departureDate'];

  dataSource: MatTableDataSource<Event> = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  isDataFound = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private eventService: EventService, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) {
  }

  eventDialog(title?: string, id?: number): void {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
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

}
