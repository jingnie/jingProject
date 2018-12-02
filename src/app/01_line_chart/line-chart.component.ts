import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {HttpClient} from '@angular/common/http';

import { STOCKS } from '../shared';

@Component({
    selector: 'app-line-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

    title = 'Line Chart';

    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;
    public index: [number, number];
    constructor( public http: HttpClient) {
      this.width = 900 - this.margin.left - this.margin.right;
      this.height = 500 - this.margin.top - this.margin.bottom;
    }
    ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
    this.addPost(this.index);
    this.timeout();
  }

    private initSvg() {
        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis() {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent(STOCKS, (d) => d.index ));
        this.y.domain(d3Array.extent(STOCKS, (d) => d.value ));
    }

    private drawAxis() {

        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Value');
    }

    private drawLine() {
        this.line = d3Shape.line()
            .x( (d: any) => this.x(d.index) )
            .y( (d: any) => this.y(d.value) );
       this.index = this.svg.append('path').datum(STOCKS)._groups[0][0].__data__;
        this.svg.append('path')
            .datum(STOCKS)
            .attr('class', 'line')
            .attr('d', this.line);
    }
  private addPost(index: number[]) {
    const post = [index];
    this.http
      .post<{ message: string }>('http://localhost:3000/posts', post)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }
   saveData(index: number[]) {
    const post = [index];
    this.http
      .post<{ message: string }>('http://localhost:3000/datas', post)
      .subscribe(responseData => {
        console.log(responseData.message);
      });
  }
  timeout() {
    setTimeout(function () {
      window.location.reload();
    }, 10000);
  }

}