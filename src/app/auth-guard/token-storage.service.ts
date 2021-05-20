import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "./auth.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router, private authService: AuthService) {
  }

  public signOut(): void {
    this.router.navigate(['admin', 'login']);
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public route(roles) {
    if (roles.includes('ROLE_ADMIN')) {
      this.routeToAdminDashboard();
    } else {
      this.routeToUserDashboard();
    }
  }

  public routeToAdminDashboard() {
    this.router.navigate(['user', 'dashboard']);
  }

  public routeToUserDashboard() {
    this.router.navigate(['user', 'booking']);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
