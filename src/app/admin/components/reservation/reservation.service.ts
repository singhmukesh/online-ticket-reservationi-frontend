import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private RESERVATION_SERVICE = environment.backend_url + '/reservation';
  dialogData: any;

  constructor(private http: HttpClient) {
  }

  fetchPage(field: string = '',
            order: SortDirection = '',
            page: number = 0,
            perPage: number = 5): Observable<any> {
    return this.http.get(this.RESERVATION_SERVICE + '?' + this.createUrlQuery(field, order, page, perPage));
  }

  getAllBookingData(field: string = '',
                    order: SortDirection = '',
                    page: number = 0,
                    perPage: number = 5): Observable<any> {
    return this.http.get(this.RESERVATION_SERVICE + '/all' + '?' + this.createUrlQuery(field, order, page, perPage));
  }

  createUrlQuery(field: string, order: string, page: number, perPage: number) {
    let query: string = '';
    query += 'page=' + page + '&per-page=' + perPage + '&';
    if (field && order) {
      query += 'sort-by=' + field + '&order=' + order;
    } else {
      query += 'sort-by=id&order=asc';
    }
    return query;
  }
}
