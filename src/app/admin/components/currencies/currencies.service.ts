import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private CURRENCY_URL = environment.backend_url + '/utility/currency';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  save(data): Observable<any> {
    return this.http.post(this.CURRENCY_URL, data, this.httpOptions);
  }

  update(data): Observable<any> {
    return this.http.put(this.CURRENCY_URL, data, this.httpOptions);
  }

  getById(id): Observable<any> {
    return this.http.get(this.CURRENCY_URL + '/' + id);
  }

  getAllCurrencyWithoutPagination(): Observable<any> {
    return this.http.get(this.CURRENCY_URL + '/getall');
  }

  deleteById(id): Observable<any> {
    return this.http.delete(this.CURRENCY_URL + '/' + id);
  }

  toggleFlag(id): Observable<any> {
    return this.http.get(this.CURRENCY_URL + '/toggle/' + id);
  }

  fetchPage(field: string = '',
            order: SortDirection = '',
            page: number = 0,
            perPage: number = 5): Observable<any> {
    return this.http.get(this.CURRENCY_URL + '?' + this.createUrlQuery(field, order, page, perPage));
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
