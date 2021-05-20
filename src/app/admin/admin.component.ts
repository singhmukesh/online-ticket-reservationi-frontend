import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../auth-guard/token-storage.service';
import {NavService} from './nav.service';
import {PaymentService} from "./components/payment/payment.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  events: string[] = [];
  opened: boolean;

  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: any;

  constructor(protected tokenStorageService: TokenStorageService, private navService: NavService, private paymentService: PaymentService) {

  }

  ngOnInit(): void {
    this.paymentService.getNavItems().subscribe(res => {
      this.navItems = res;
    }, error => {
      console.log(error)
    });

  }

  logOut() {
    this.tokenStorageService.signOut();
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
