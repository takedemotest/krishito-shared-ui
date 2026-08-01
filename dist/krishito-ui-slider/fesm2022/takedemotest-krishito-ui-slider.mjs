import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, Component } from '@angular/core';

class SliderDrawerComponent {
    position = 'left';
    isOpen = false;
    width = '250px';
    title = 'Drawer Title';
    isOpenChange = new EventEmitter();
    closed = new EventEmitter();
    toggleSliderDrawer() {
        this.isOpen = !this.isOpen;
        this.isOpenChange.emit(this.isOpen);
        if (!this.isOpen) {
            this.closed.emit();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: SliderDrawerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.0", type: SliderDrawerComponent, isStandalone: true, selector: "slider-drawer", inputs: { position: "position", isOpen: "isOpen", width: "width", title: "title" }, outputs: { isOpenChange: "isOpenChange", closed: "closed" }, ngImport: i0, template: "<div class=\"slider-drawer\" *ngIf=\"isOpen\" (click)=\"toggleSliderDrawer()\" [ngClass]=\"position\">\n  <div class=\"slider-drawer_content\" \n    [style.width]=\"position === 'left' || position === 'right' ? width : '100%'\"\n    [style.height]=\"position === 'top' || position === 'bottom' ? width : '100%'\"   \n    (click)=\"$event.stopPropagation()\">\n    <div class=\"slider-drawer_header\">\n         <h5>{{ title }}</h5>\n         <button class=\"ui-close-x\" (click)=\"toggleSliderDrawer()\">\u2715</button>\n    </div>\n    <div class=\"slider-drawer_body\">\n         <ng-content></ng-content>\n    </div>\n  </div>\n</div>", styles: [".slider-drawer{position:fixed;width:100%;height:100vh;top:0;background:#000000a3;z-index:1;display:flex}.slider-drawer.left{justify-content:flex-start}.slider-drawer.right{justify-content:flex-end}.slider-drawer_content{background:var(--main-bg-color)}.slider-drawer_header{display:flex;justify-content:space-between;padding:15px;align-items:center;border-bottom:1px solid #e0e0e0}.slider-drawer_header h5{margin-bottom:0}.slider-drawer_body{height:calc(100vh - 100px);overflow:auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: SliderDrawerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'slider-drawer', standalone: true, imports: [CommonModule], template: "<div class=\"slider-drawer\" *ngIf=\"isOpen\" (click)=\"toggleSliderDrawer()\" [ngClass]=\"position\">\n  <div class=\"slider-drawer_content\" \n    [style.width]=\"position === 'left' || position === 'right' ? width : '100%'\"\n    [style.height]=\"position === 'top' || position === 'bottom' ? width : '100%'\"   \n    (click)=\"$event.stopPropagation()\">\n    <div class=\"slider-drawer_header\">\n         <h5>{{ title }}</h5>\n         <button class=\"ui-close-x\" (click)=\"toggleSliderDrawer()\">\u2715</button>\n    </div>\n    <div class=\"slider-drawer_body\">\n         <ng-content></ng-content>\n    </div>\n  </div>\n</div>", styles: [".slider-drawer{position:fixed;width:100%;height:100vh;top:0;background:#000000a3;z-index:1;display:flex}.slider-drawer.left{justify-content:flex-start}.slider-drawer.right{justify-content:flex-end}.slider-drawer_content{background:var(--main-bg-color)}.slider-drawer_header{display:flex;justify-content:space-between;padding:15px;align-items:center;border-bottom:1px solid #e0e0e0}.slider-drawer_header h5{margin-bottom:0}.slider-drawer_body{height:calc(100vh - 100px);overflow:auto}\n"] }]
        }], propDecorators: { position: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], width: [{
                type: Input
            }], title: [{
                type: Input
            }], isOpenChange: [{
                type: Output
            }], closed: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { SliderDrawerComponent };
//# sourceMappingURL=takedemotest-krishito-ui-slider.mjs.map
