import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  data:any;
  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.getDataForDashboard();
  }

  private getDataForDashboard() {
    this.dashboardService.getDashboardData().subscribe(res => {
        this.data = res;
        console.log(res)
      },
      error => {
        console.log(error)
      });
  }
}
