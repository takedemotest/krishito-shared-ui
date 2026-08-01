import { ChartData, ChartType, ChartConfiguration } from 'chart.js';
import * as i0 from '@angular/core';

declare class ChartComponent {
    chartData: ChartData | null;
    chartType: ChartType;
    chartOptions: ChartConfiguration['options'];
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<ChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChartComponent, "graph", never, { "chartData": { "alias": "chartData"; "required": false; }; "chartType": { "alias": "chartType"; "required": false; }; "chartOptions": { "alias": "chartOptions"; "required": false; }; }, {}, never, never, true, never>;
}

export { ChartComponent };
