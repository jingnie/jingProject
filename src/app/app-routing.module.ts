import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineChartComponent } from './01_line_chart/line-chart.component';
import {ListDataComponent} from './list_data/list_data.component';

const routes: Routes = [
  { path: 'line-chart', component: LineChartComponent },
  { path: 'list-data', component: ListDataComponent },
  { path: '', redirectTo: '/line-chart', pathMatch: 'full'},
  { path: '**', component: LineChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
