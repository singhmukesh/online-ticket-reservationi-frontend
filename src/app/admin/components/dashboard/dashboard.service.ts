import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private RESERVATION = environment.backend_url + '/reservation';
  dialogData: any;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getMonthlyBookingInfo(): Observable<any> {
    return this.http.get(this.RESERVATION + '/monthly-booking');
  }

  getMonthlyMonthlyRevenue(): Observable<any> {
    return this.http.get(this.RESERVATION + '/monthly-revenue');
  }

  getDashboardData() {
    return this.http.get(this.RESERVATION + '/stat');
  }
}
