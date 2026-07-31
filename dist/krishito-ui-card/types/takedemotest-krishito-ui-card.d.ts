import * as _takedemotest_krishito_ui_card from '@takedemotest/krishito-ui-card';
import * as _angular_core from '@angular/core';
import { TemplateRef } from '@angular/core';
import { IconService } from '@takedemotest/krishito-ui-icons';

interface CardFooterAction {
    id: string;
    label: string;
    action: string;
    icon?: string;
    type?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}
interface CardConfig {
    id: string;
    showHeader: boolean;
    headerTitle?: string;
    showCloseButton?: boolean;
    isClickable?: boolean;
    title?: string;
    subtitle?: string;
    matric?: string;
    progress?: number;
    hasBodyContent?: TemplateRef<any>;
    body?: string;
    showFooter?: boolean;
    footerActions?: CardFooterAction[];
    icon?: string;
    randomBg?: string;
    cssClass?: string;
}

declare class CardsComponent {
    iconService: IconService;
    cardConfig: _angular_core.InputSignal<CardConfig[]>;
    type: _angular_core.InputSignal<"inline" | "block" | undefined>;
    cardTitle: _angular_core.InputSignal<string>;
    actions: _angular_core.OutputEmitterRef<{
        cardId: string;
        actionId: string;
    }>;
    protected hasCustomHeader: boolean;
    private defaultSlotContent;
    hasBodyContent: _angular_core.Signal<boolean>;
    config: _angular_core.Signal<{
        randomBg: string;
        id: string;
        showHeader: boolean;
        headerTitle?: string;
        showCloseButton?: boolean;
        isClickable?: boolean;
        title?: string;
        subtitle?: string;
        matric?: string;
        progress?: number;
        hasBodyContent?: _angular_core.TemplateRef<any>;
        body?: string;
        showFooter?: boolean;
        footerActions?: _takedemotest_krishito_ui_card.CardFooterAction[];
        icon?: string;
        cssClass?: string;
    }[]>;
    private getRandomColour;
    onClose(event: MouseEvent): void;
    cardAction: _angular_core.OutputEmitterRef<{
        cardId: string;
        actionId: string;
    }>;
    onActionClick(event: MouseEvent, actionId: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CardsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CardsComponent, "cards", never, { "cardConfig": { "alias": "config"; "required": true; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "cardTitle": { "alias": "cardTitle"; "required": false; "isSignal": true; }; }, { "actions": "actions"; "cardAction": "cardAction"; }, ["defaultSlotContent"], ["[custom-header]", "[custom-footer]"], true, never>;
}

export { CardsComponent };
export type { CardConfig, CardFooterAction };
