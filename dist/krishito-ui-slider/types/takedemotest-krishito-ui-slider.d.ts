import * as i0 from '@angular/core';
import { EventEmitter } from '@angular/core';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
declare class SliderDrawerComponent {
    position: DrawerPosition;
    isOpen: boolean;
    width: string;
    title: string;
    isOpenChange: EventEmitter<boolean>;
    closed: EventEmitter<void>;
    toggleSliderDrawer(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderDrawerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SliderDrawerComponent, "slider-drawer", never, { "position": { "alias": "position"; "required": false; }; "isOpen": { "alias": "isOpen"; "required": false; }; "width": { "alias": "width"; "required": false; }; "title": { "alias": "title"; "required": false; }; }, { "isOpenChange": "isOpenChange"; "closed": "closed"; }, never, ["*"], true, never>;
}

export { SliderDrawerComponent };
export type { DrawerPosition };
