import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Input, Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

class GraphComponent {
    GraphData = null;
    ;
    GraphType = 'line';
    GraphOptions = {
        responsive: true
    };
    constructor() {
        console.log("GraphComponent initialized!");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: GraphComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.0", type: GraphComponent, isStandalone: true, selector: "graph", inputs: { GraphData: "GraphData", GraphType: "GraphType", GraphOptions: "GraphOptions" }, ngImport: i0, template: "<div *ngIf=\"GraphData\">\n  <canvas \n    baseChart\n    [data]=\"GraphData\"\n    [type]=\"GraphType\"\n    [options]=\"GraphOptions\">\n  </canvas>\n</div>", styles: [""], dependencies: [{ kind: "directive", type: BaseChartDirective, selector: "canvas[baseChart]", inputs: ["type", "legend", "data", "options", "plugins", "labels", "datasets"], outputs: ["chartClick", "chartHover"], exportAs: ["base-chart"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: GraphComponent, decorators: [{
            type: Component,
            args: [{ selector: 'graph', imports: [BaseChartDirective, CommonModule], standalone: true, template: "<div *ngIf=\"GraphData\">\n  <canvas \n    baseChart\n    [data]=\"GraphData\"\n    [type]=\"GraphType\"\n    [options]=\"GraphOptions\">\n  </canvas>\n</div>" }]
        }], ctorParameters: () => [], propDecorators: { GraphData: [{
                type: Input
            }], GraphType: [{
                type: Input
            }], GraphOptions: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { GraphComponent };
//# sourceMappingURL=takedemotest-krishito-ui-graph.mjs.map
