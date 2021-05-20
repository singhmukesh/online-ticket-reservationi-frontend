import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../auth-guard/token-storage.service';
import {NavService} from './nav.service';
import {PaymentService} from "./components/payment/payment.service";
import {NavItem} from "./nav-item";

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

  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: 'user/dashboard'
    },
    {
      displayName: 'Events',
      iconName: 'memory',
      route: 'user/events'
    },
    {
      displayName: 'Ticket',
      iconName: 'architecture',
      route: 'user/ticket'
    },
    {
      displayName: 'Payment',
      iconName: 'settings',
      route: 'user/payment'
    },
    {
      displayName: 'Reservation',
      iconName: 'attach_email',
      route: 'user/reservation'
    },
    {
      displayName: 'Book',
      iconName: 'attach_email',
      route: 'user/booking'
    }
  ];
  fullName: string;
  navItem: any;

  constructor(protected tokenStorageService: TokenStorageService, private navService: NavService, private paymentService: PaymentService) {

  }

  ngOnInit(): void {
    // this.fullName = this.tokenStorageService.getUser().fullName;
    this.paymentService.getNavItems().subscribe(res => {
      this.navItem = res;

    });

  }

  logOut() {
    this.tokenStorageService.signOut();
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
