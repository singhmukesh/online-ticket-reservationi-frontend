import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  data: any;
  private svg;
  private margin = 30;
  private width = 510;
  private height = 410;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.getMonthlyRevenue();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.count.toString()))
      .range(["#a15027", "#323ce5", "#9753e3", "#4b3ccb", "#5a6782"]);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.count));

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr("stroke", "#f1e6e6")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(80)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text(d => d.data.Month)
      .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 18);
  }

  private getMonthlyRevenue() {
    this.dashboardService.getMonthlyBookingInfo().subscribe(res => {
        this.data = res;
        this.createSvg();
        this.createColors();
        this.drawChart();
      },
      error => {
        console.log(error)
      });
  }
}
