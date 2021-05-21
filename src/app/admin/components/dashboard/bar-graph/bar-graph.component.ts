import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {DashboardService} from "../dashboard.service";

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {
  data: any;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.getBookingData();
  }

  private svg;
  private margin = 50;
  private width = 550 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Month))
      .padding(0.2);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 5000])
      .range([this.height, 0]);

    this.svg.append("g")
      .call(d3.axisLeft(y));

    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Month))
      .attr("y", d => y(d.total))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.total))
      .attr("fill", "#d04a35");
  }

  private getBookingData() {
    this.dashboardService.getMonthlyRevenue().subscribe(res => {
        this.data = res;
        this.createSvg();
        this.drawBars(this.data);
      },
      error => {
        console.log(error)
      });
  }
}
