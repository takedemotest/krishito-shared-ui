import * as i1 from '@angular/common';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, input, output, contentChild, ElementRef, computed, Component } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '@takedemotest/krishito-ui-icons';

class CardsComponent {
    iconService = inject(IconService);
    cardConfig = input.required({ ...(ngDevMode ? { debugName: "cardConfig" } : /* istanbul ignore next */ {}), alias: 'config' });
    type = input(/* @ts-ignore */
    ...(ngDevMode ? [undefined, { debugName: "type" }] : /* istanbul ignore next */ []));
    cardTitle = input('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "cardTitle" }] : /* istanbul ignore next */ []));
    actions = output();
    hasCustomHeader = false;
    defaultSlotContent = contentChild(ElementRef, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "defaultSlotContent" }] : /* istanbul ignore next */ []));
    hasBodyContent = computed(() => {
        const element = this.defaultSlotContent();
        return !!element;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hasBodyContent" }] : /* istanbul ignore next */ []));
    config = computed(() => {
        return this.cardConfig().map(item => ({
            ...item,
            randomBg: this.getRandomColour()
        }));
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "config" }] : /* istanbul ignore next */ []));
    getRandomColour() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 80%)`;
    }
    onClose(event) {
    }
    cardAction = output();
    onActionClick(event, actionId) {
        event.stopPropagation();
        this.actions.emit({ cardId: this.config()[0].id, actionId: actionId });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.8", ngImport: i0, type: CardsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.8", type: CardsComponent, isStandalone: true, selector: "cards", inputs: { cardConfig: { classPropertyName: "cardConfig", publicName: "config", isSignal: true, isRequired: true, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, cardTitle: { classPropertyName: "cardTitle", publicName: "cardTitle", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { actions: "actions", cardAction: "cardAction" }, queries: [{ propertyName: "defaultSlotContent", first: true, predicate: ElementRef, descendants: true, isSignal: true }], ngImport: i0, template: "<div class=\"card-container\">\n  @if(cardTitle()){\n  <h6>{{cardTitle()}}</h6>\n  }\n  <div class=\"card-align\" [class]=\"type() || 'inline'\">\n    @for(item of config(); track item.id){\n    <div class=\"card card-flex\" [class.clickable]=\"item.isClickable\"\n      (click)=\"item.isClickable ? cardAction.emit({cardId: item.id, actionId: 'CARD_BODY_CLICK'}) : null\">\n      <div class=\"card_header\">\n        @if(item.showHeader){\n        <ng-content select=\"[custom-header]\"></ng-content>\n        @if(!hasCustomHeader){\n        @if(item.icon){\n        <div class=\"card_header-icon\" [style.background-color]=\"item.randomBg\">\n          <mat-icon [svgIcon]=\"item.icon\"></mat-icon>\n        </div>\n        }\n        <div class=\"card__title-container\">\n          <div class=\"card_header-title\">\n            {{item.title}}\n          </div>\n          <div class=\"card_header-subtitle\">\n            {{item.subtitle}}\n          </div>\n        </div>\n        }\n        @if(item.showCloseButton){\n        <div class=\"card_close\" (click)=\"onClose($event)\">\n          <mat-icon [svgIcon]=\"'close'\"></mat-icon>\n        </div>\n        }\n        }\n      </div>\n      @if(item.hasBodyContent || item.body){\n      <div class=\"card_body\">\n        @if(item.hasBodyContent){\n        <ng-container *ngTemplateOutlet=\"item.hasBodyContent; context:{$implicit:item}\"></ng-container>\n        }@else {\n        {{item.body}}\n        }\n      </div>\n      }\n      @if(item.showFooter){\n      <div class=\"card_footer\">\n        <ng-content select=\"[custom-footer]\"></ng-content>\n      </div>\n      @if(item.footerActions && item.footerActions!.length > 0){\n      <div class=\"card_footer_actions\">\n        @for(btn of item.footerActions; track btn.id){\n        <button class=\"btn btn-light\" [ngClass]=\"'btn-' + btn.type\" (click)=\"onActionClick($event, btn.id)\">\n          {{btn.label}}\n        </button>\n        }\n      </div>\n      }\n      }\n    </div>\n    }\n  </div>\n</div>", styles: [".card-container .card-align{gap:15px;display:flex;flex-direction:column}.card-container .card-align.inline{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}.card{border:none;box-shadow:0 2px 4px #0000001a;border-radius:5px;background:#fff}.card_header,.card_footer,.card_body{padding:15px}.card.clickable{cursor:pointer}.card_header{display:flex;align-items:center;gap:10px}.card_header-icon{border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center}.card_header-subtitle{font-size:12px;color:#666}.card-flex{display:flex;flex-direction:column;justify-content:space-between}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.8", ngImport: i0, type: CardsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cards', imports: [CommonModule, MatIconModule, NgTemplateOutlet], template: "<div class=\"card-container\">\n  @if(cardTitle()){\n  <h6>{{cardTitle()}}</h6>\n  }\n  <div class=\"card-align\" [class]=\"type() || 'inline'\">\n    @for(item of config(); track item.id){\n    <div class=\"card card-flex\" [class.clickable]=\"item.isClickable\"\n      (click)=\"item.isClickable ? cardAction.emit({cardId: item.id, actionId: 'CARD_BODY_CLICK'}) : null\">\n      <div class=\"card_header\">\n        @if(item.showHeader){\n        <ng-content select=\"[custom-header]\"></ng-content>\n        @if(!hasCustomHeader){\n        @if(item.icon){\n        <div class=\"card_header-icon\" [style.background-color]=\"item.randomBg\">\n          <mat-icon [svgIcon]=\"item.icon\"></mat-icon>\n        </div>\n        }\n        <div class=\"card__title-container\">\n          <div class=\"card_header-title\">\n            {{item.title}}\n          </div>\n          <div class=\"card_header-subtitle\">\n            {{item.subtitle}}\n          </div>\n        </div>\n        }\n        @if(item.showCloseButton){\n        <div class=\"card_close\" (click)=\"onClose($event)\">\n          <mat-icon [svgIcon]=\"'close'\"></mat-icon>\n        </div>\n        }\n        }\n      </div>\n      @if(item.hasBodyContent || item.body){\n      <div class=\"card_body\">\n        @if(item.hasBodyContent){\n        <ng-container *ngTemplateOutlet=\"item.hasBodyContent; context:{$implicit:item}\"></ng-container>\n        }@else {\n        {{item.body}}\n        }\n      </div>\n      }\n      @if(item.showFooter){\n      <div class=\"card_footer\">\n        <ng-content select=\"[custom-footer]\"></ng-content>\n      </div>\n      @if(item.footerActions && item.footerActions!.length > 0){\n      <div class=\"card_footer_actions\">\n        @for(btn of item.footerActions; track btn.id){\n        <button class=\"btn btn-light\" [ngClass]=\"'btn-' + btn.type\" (click)=\"onActionClick($event, btn.id)\">\n          {{btn.label}}\n        </button>\n        }\n      </div>\n      }\n      }\n    </div>\n    }\n  </div>\n</div>", styles: [".card-container .card-align{gap:15px;display:flex;flex-direction:column}.card-container .card-align.inline{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}.card{border:none;box-shadow:0 2px 4px #0000001a;border-radius:5px;background:#fff}.card_header,.card_footer,.card_body{padding:15px}.card.clickable{cursor:pointer}.card_header{display:flex;align-items:center;gap:10px}.card_header-icon{border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center}.card_header-subtitle{font-size:12px;color:#666}.card-flex{display:flex;flex-direction:column;justify-content:space-between}\n"] }]
        }], propDecorators: { cardConfig: [{ type: i0.Input, args: [{ isSignal: true, alias: "config", required: true }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], cardTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "cardTitle", required: false }] }], actions: [{ type: i0.Output, args: ["actions"] }], defaultSlotContent: [{ type: i0.ContentChild, args: [i0.forwardRef(() => ElementRef), { isSignal: true }] }], cardAction: [{ type: i0.Output, args: ["cardAction"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CardsComponent };
//# sourceMappingURL=krishito-ui-card.mjs.map
