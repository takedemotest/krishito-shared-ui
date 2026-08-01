import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'graph',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './krishito-ui-graph.component.html',
  styleUrl: './krishito-ui-graph.component.scss',
  standalone: true
})
export class ChartComponent {
  @Input() chartData: ChartData | null = null;;
  @Input() chartType: ChartType = 'line';
  @Input() chartOptions: ChartConfiguration['options']={
        responsive:true
  }

  constructor() {
    console.log("ChartComponent initialized!");
  }

}
