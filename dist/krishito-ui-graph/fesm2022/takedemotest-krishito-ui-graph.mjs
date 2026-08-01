import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Input, Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

class ChartComponent {
    chartData = null;
    ;
    chartType = 'line';
    chartOptions = {
        responsive: true
    };
    constructor() {
        console.log("ChartComponent initialized!");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: ChartComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.0", type: ChartComponent, isStandalone: true, selector: "graph", inputs: { chartData: "chartData", chartType: "chartType", chartOptions: "chartOptions" }, ngImport: i0, template: "<div *ngIf=\"chartData\">\n  <canvas \n    baseChart\n    [data]=\"chartData\"\n    [type]=\"chartType\"\n    [options]=\"chartOptions\">\n  </canvas>\n</div>", styles: [""], dependencies: [{ kind: "directive", type: BaseChartDirective, selector: "canvas[baseChart]", inputs: ["type", "legend", "data", "options", "plugins", "labels", "datasets"], outputs: ["chartClick", "chartHover"], exportAs: ["base-chart"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: ChartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'graph', imports: [BaseChartDirective, CommonModule], standalone: true, template: "<div *ngIf=\"chartData\">\n  <canvas \n    baseChart\n    [data]=\"chartData\"\n    [type]=\"chartType\"\n    [options]=\"chartOptions\">\n  </canvas>\n</div>" }]
        }], ctorParameters: () => [], propDecorators: { chartData: [{
                type: Input
            }], chartType: [{
                type: Input
            }], chartOptions: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ChartComponent };
//# sourceMappingURL=takedemotest-krishito-ui-graph.mjs.map
