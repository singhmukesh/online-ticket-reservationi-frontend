import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private EVENT_URL = environment.backend_url + '/event';
  dialogData: any;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }
  save(event): Observable<any> {
    return this.http.post(this.EVENT_URL, event, this.httpOptions);
  }

  update(data): Observable<any> {
    return this.http.put(this.EVENT_URL, data, this.httpOptions);
  }

  getById(id): Observable<any> {
    return this.http.get(this.EVENT_URL + '/' + id);
  }

  deleteById(id): Observable<any> {
    return this.http.delete(this.EVENT_URL + '/' + id);
  }


  fetchPage(field: string = '',
            order: SortDirection = '',
            page: number = 0,
            perPage: number = 5): Observable<any> {
    return this.http.get(this.EVENT_URL + '?' + this.createUrlQuery(field, order, page, perPage));
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
