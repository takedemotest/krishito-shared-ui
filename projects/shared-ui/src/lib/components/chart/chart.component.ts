import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
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
