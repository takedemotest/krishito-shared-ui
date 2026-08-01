import { ChartData, ChartType, ChartConfiguration } from 'chart.js';
import * as i0 from '@angular/core';

declare class GraphComponent {
    GraphData: ChartData | null;
    GraphType: ChartType;
    GraphOptions: ChartConfiguration['options'];
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<GraphComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GraphComponent, "graph", never, { "GraphData": { "alias": "GraphData"; "required": false; }; "GraphType": { "alias": "GraphType"; "required": false; }; "GraphOptions": { "alias": "GraphOptions"; "required": false; }; }, {}, never, never, true, never>;
}

export { GraphComponent };
