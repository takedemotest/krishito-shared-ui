import * as i0 from '@angular/core';
import { OnInit, OnChanges, EventEmitter, ChangeDetectorRef, DestroyRef, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IconService } from '@takedemotest/krishito-ui-icons';

type InputType = 'text' | 'email' | 'number' | 'password' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio';
interface FormFieldConfig {
    type: InputType;
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    message?: string;
    disabled?: boolean;
    options?: {
        label: string;
        value: any;
    }[];
    minLength?: number;
    maxLength?: number;
}
interface FormButtonConfig {
    label?: string;
    action: string;
    type?: 'button' | 'submit';
    icon?: string;
    cssClass?: string;
    dropdown?: boolean;
    dropdownItem?: {
        label?: string;
        action: string;
        icon?: string;
    }[];
    disabled?: boolean;
}
interface FormConfig {
    title?: string;
    type?: 'inline' | 'block';
    fields: FormFieldConfig[];
    buttonConfig: FormButtonConfig;
}

declare class DynamicFormComponent implements OnInit, OnChanges {
    private fb;
    private iconService;
    private cdr;
    private destroyRef;
    fields: FormFieldConfig[];
    buttonConfig?: FormButtonConfig | undefined;
    title?: string;
    type?: string;
    initialData: any;
    actionTriggered: EventEmitter<{
        action: string;
        data: any;
    }>;
    form: FormGroup;
    constructor(fb: FormBuilder, iconService: IconService, // future scope
    cdr: ChangeDetectorRef, destroyRef: DestroyRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    createForm(): void;
    syncFormControls(fields: FormFieldConfig[]): void;
    private listenToValueChange;
    runAiAgent(value: any): void;
    handleAction(actionName: string | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormComponent, "dynamic-form", never, { "fields": { "alias": "fields"; "required": false; }; "buttonConfig": { "alias": "buttonConfig"; "required": false; }; "title": { "alias": "title"; "required": false; }; "type": { "alias": "type"; "required": false; }; "initialData": { "alias": "initialData"; "required": false; }; }, { "actionTriggered": "actionTriggered"; }, never, never, true, never>;
}

export { DynamicFormComponent };
export type { FormButtonConfig, FormConfig, FormFieldConfig, InputType };
