import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = " http://127.0.0.1:9191/oauth/token";
  private USER_URL = environment.backend_url + '/user';
  encodedCredentials = btoa("web:pin");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + this.encodedCredentials
    })
  };

  constructor(private http: HttpClient) {
  }

  login(user): Observable<any> {
    let access_token_url = this.LOGIN_URL + "?grant_type=password" + "&username=" + user.username +
      "&password=" + user.password;
    return this.http.post(access_token_url, user, this.httpOptions);
  }

  getUserRoles() {
    return this.http.get(this.USER_URL + "/roles");
  }
}
