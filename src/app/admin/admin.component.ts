import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../auth-guard/token-storage.service';
import {NavItem} from './nav-item';
import {NavService} from './nav.service';

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
      route: 'admin/dashboard'
    },
    {
      displayName: 'Events',
      iconName: 'memory',
      route: 'admin/events'
    },
    {
      displayName: 'Ticket',
      iconName: 'architecture',
      route: 'admin/ticket'
    },
    {
      displayName: 'Payment',
      iconName: 'settings',
      route: 'admin/payment'
    },
    {
      displayName: 'Reservation',
      iconName: 'attach_email',
      route: 'admin/reservation'
    },
    {
      displayName: 'Book',
      iconName: 'attach_email',
      route: 'admin/booking'
    }
  ];
  fullName: string;

  constructor(protected tokenStorageService: TokenStorageService, private navService: NavService) {

  }

  ngOnInit(): void {
    // this.fullName = this.tokenStorageService.getUser().fullName;

  }

  logOut() {
    this.tokenStorageService.signOut();
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
