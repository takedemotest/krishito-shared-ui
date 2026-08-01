import * as _takedemotest_krishito_ui_navigation from '@takedemotest/krishito-ui-navigation';
import * as i0 from '@angular/core';
import * as rxjs from 'rxjs';

type MenuType = string;
interface NavItem {
    label: string;
    icon: string;
    route: string;
    action?: string;
    roleAllowed?: string[];
}
interface NavCategory {
    categoryName?: string;
    items: NavItem[];
}

declare class NavigationComponent {
    private navService;
    layoutKey: i0.InputSignal<string>;
    menuData: i0.Signal<_takedemotest_krishito_ui_navigation.NavCategory[]>;
    onItemClick(item: NavItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationComponent, "navigation-menu", never, { "layoutKey": { "alias": "layoutKey"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class NavigationService {
    private actionSubject;
    menuAction$: rxjs.Observable<NavItem>;
    private registrySignal;
    private userRoleSignal;
    activeMenuLayout: i0.Signal<Record<string, NavCategory[]>>;
    registerMenu(type: MenuType, config: NavCategory[]): void;
    setUserRole(role: string): void;
    emitAction(item: NavItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NavigationService>;
}

export { NavigationComponent, NavigationService };
export type { MenuType, NavCategory, NavItem };
