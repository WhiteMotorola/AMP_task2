import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private color;
  private arc;
  private labelArc;
  private pie;
  private svg;

  private width = 960;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2;

  constructor () {
    this.prepare();
    this.readCSV();
  }

  prepare () {
    this.color = d3.scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    this.arc = d3.arc().outerRadius(this.radius - 10).innerRadius(0);
    this.labelArc = d3.arc().outerRadius(this.radius - 40).innerRadius(this.radius - 40);
    this.pie = d3.pie().sort(null).value(function (d) { return d.population; });
    this.svg = d3.select('app-root').append('svg').attr('width', this.width).attr('height', this.height)
      .append('g').attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  readCSV () {
    d3.csv('/csv', this.type, (error, data) => {
      if (error) {
        throw error;
      }

      let g = this.svg.selectAll('.arc')
        .data(this.pie(data)).enter().append('g').attr('class', 'arc');

      g.append('path').attr('d', this.arc).style('fill', (d) => { return this.color(d.data.age); });

      g.append('text')
        .attr('transform', (d) => { return 'translate(' + this.labelArc.centroid(d) + ')'; })
        .attr('dy', '.35em').text(function (d) { return d.data.age; });
    });
  }

  type (d) {
    d.population = +d.population;
    return d;
  }

}
