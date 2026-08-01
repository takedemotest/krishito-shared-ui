import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { signal, computed, Injectable, inject, input, Component } from '@angular/core';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

class NavigationService {
    actionSubject = new Subject();
    menuAction$ = this.actionSubject.asObservable();
    registrySignal = signal({}, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "registrySignal" }] : /* istanbul ignore next */ []));
    userRoleSignal = signal('worker', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "userRoleSignal" }] : /* istanbul ignore next */ []));
    activeMenuLayout = computed(() => {
        const role = this.userRoleSignal();
        const rawMenu = this.registrySignal();
        const filteredRegistry = {};
        Object.keys(rawMenu).forEach((key) => {
            filteredRegistry[key] = rawMenu[key]
                .map(category => ({
                ...category,
                items: category.items.filter(item => !item.roleAllowed || item.roleAllowed.includes(role))
            })).filter(category => category.items.length > 0);
        });
        return filteredRegistry;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "activeMenuLayout" }] : /* istanbul ignore next */ []));
    registerMenu(type, config) {
        this.registrySignal.update(state => ({ ...state, [type]: config }));
    }
    setUserRole(role) {
        this.userRoleSignal.set(role);
    }
    emitAction(item) {
        this.actionSubject.next(item);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: NavigationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: NavigationService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: NavigationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class NavigationComponent {
    navService = inject(NavigationService);
    layoutKey = input.required(/* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "layoutKey" }] : /* istanbul ignore next */ []));
    menuData = computed(() => {
        return this.navService.activeMenuLayout()[this.layoutKey()] || [];
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "menuData" }] : /* istanbul ignore next */ []));
    onItemClick(item) {
        if (item.action) {
            this.navService.emitAction(item);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: NavigationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.0", type: NavigationComponent, isStandalone: true, selector: "navigation-menu", inputs: { layoutKey: { classPropertyName: "layoutKey", publicName: "layoutKey", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<nav>\n  <ul class=\"nav flex-column\">\n\n    @for(cat of menuData(); track cat.categoryName){\n    @if(cat.categoryName){\n    <div class=\"menu-category\">{{cat.categoryName}}</div>\n    }\n    @for(item of cat.items; track item.route){\n    <li class=\"nav-item\">\n     \n      @if(item.action){\n        <a class=\"nav-link\"\n        (click)=\"onItemClick(item)\"\n        [routerLink]=\"item.route\"\n        routerLinkActive=\"active-link\"\n        ><mat-icon svgIcon=\"{{item.icon}}\"></mat-icon>{{item.label}}</a>\n      }@else {\n        <a class=\"nav-link\"\n        [routerLink]=\"item.route\"\n        routerLinkActive=\"active-link\"\n        ><mat-icon svgIcon=\"{{item.icon}}\"></mat-icon>{{item.label}}</a>\n      }\n    </li>\n    }\n    }\n  </ul>\n</nav>", styles: [".nav .nav-link{font-size:var(--nav-link-font-size, 12px);color:var(--main-text-color);padding:var(--nav-link-padding, 5px 0px);display:flex;gap:var(--nav-link-gap, 5px);align-items:center}.nav .nav-link mat-icon{width:18px;height:18px}.nav .menu-category{font-size:var(--menu-category-font-size, 14px);color:#000;padding:10px 0 0;border-top:1px solid var(--border-color);margin-top:10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "browserUrl", "routerLink"] }, { kind: "directive", type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: NavigationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'navigation-menu', standalone: true, imports: [CommonModule, MatIconModule, RouterModule], template: "<nav>\n  <ul class=\"nav flex-column\">\n\n    @for(cat of menuData(); track cat.categoryName){\n    @if(cat.categoryName){\n    <div class=\"menu-category\">{{cat.categoryName}}</div>\n    }\n    @for(item of cat.items; track item.route){\n    <li class=\"nav-item\">\n     \n      @if(item.action){\n        <a class=\"nav-link\"\n        (click)=\"onItemClick(item)\"\n        [routerLink]=\"item.route\"\n        routerLinkActive=\"active-link\"\n        ><mat-icon svgIcon=\"{{item.icon}}\"></mat-icon>{{item.label}}</a>\n      }@else {\n        <a class=\"nav-link\"\n        [routerLink]=\"item.route\"\n        routerLinkActive=\"active-link\"\n        ><mat-icon svgIcon=\"{{item.icon}}\"></mat-icon>{{item.label}}</a>\n      }\n    </li>\n    }\n    }\n  </ul>\n</nav>", styles: [".nav .nav-link{font-size:var(--nav-link-font-size, 12px);color:var(--main-text-color);padding:var(--nav-link-padding, 5px 0px);display:flex;gap:var(--nav-link-gap, 5px);align-items:center}.nav .nav-link mat-icon{width:18px;height:18px}.nav .menu-category{font-size:var(--menu-category-font-size, 14px);color:#000;padding:10px 0 0;border-top:1px solid var(--border-color);margin-top:10px}\n"] }]
        }], propDecorators: { layoutKey: [{ type: i0.Input, args: [{ isSignal: true, alias: "layoutKey", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { NavigationComponent, NavigationService };
//# sourceMappingURL=takedemotest-krishito-ui-navigation.mjs.map
