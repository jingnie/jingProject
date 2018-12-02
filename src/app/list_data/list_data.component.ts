import { Component, OnInit  } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
@Component({
  selector: 'app-list-data',
  templateUrl: './list_data.component.html',
  styleUrls: ['./list_data.component.css']
})
export class ListDataComponent implements OnInit {
  title = 'Data From Database';
   public dataIndex = 0;
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
 public posts = [];
  public data = [];
  public formedData: [ { index: number, value: number }] = []
   constructor (private  http: HttpClient) {
     this.width = 900 - this.margin.left - this.margin.right;
     this.height = 500 - this.margin.top - this.margin.bottom;
   }
  ngOnInit() {
    this.getData();
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }
  private initSvg() {
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
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

  }
  private getData() {

    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            index: post

          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        for (let i = 0; i < this.posts.length; i++) {
          for (let j = 0; j < this.posts[i].index.index[0].length;j++) {
            this.data[this.dataIndex] = this.posts[i].index.index[0][j];
            this.dataIndex++;
          }
        }
        this.formedData = [{ index : this.data[0].index, value : this.data[0].value}];
        for (let i = 1; i < this.data.length; i++) {
          this.formedData.push({ index : this.data[i].index, value : this.data[i].value});
        }
        this.x.domain(d3Array.extent(this.formedData, (d) => d.index ));
        this.y.domain(d3Array.extent(this.formedData, (d) => d.value ));
        this.svg.append('path')
          .datum(this.formedData)
          .attr('class', 'line')
          .attr('d', this.line);
      });
  }
}
