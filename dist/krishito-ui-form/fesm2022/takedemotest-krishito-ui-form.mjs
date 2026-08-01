import * as i0 from '@angular/core';
import { EventEmitter, Output, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i2 from '@takedemotest/krishito-ui-icons';

class DynamicFormComponent {
    fb;
    iconService;
    cdr;
    destroyRef;
    fields = [];
    buttonConfig;
    title;
    type;
    initialData = null;
    actionTriggered = new EventEmitter();
    form;
    constructor(fb, iconService, // future scope
    cdr, destroyRef) {
        this.fb = fb;
        this.iconService = iconService;
        this.cdr = cdr;
        this.destroyRef = destroyRef;
    }
    ngOnInit() {
        // If form wasn't built in ngOnChanges yet, build it now
        if (!this.form) {
            this.createForm();
        }
        this.listenToValueChange();
    }
    ngOnChanges(changes) {
        if (changes['fields']) {
            if (!this.form) {
                this.createForm();
            }
            else {
                this.syncFormControls(this.fields);
            }
            this.cdr.markForCheck();
        }
        if (changes['initialData'] && this.form) {
            if (this.initialData) {
                this.form.patchValue(this.initialData, { emitEvent: false });
            }
            else {
                this.form.reset();
            }
            this.cdr.markForCheck();
        }
    }
    createForm() {
        const group = {};
        this.fields.forEach(field => {
            const validators = [];
            if (field.required)
                validators.push(Validators.required);
            if (field.minLength)
                validators.push(Validators.minLength(field.minLength));
            if (field.maxLength)
                validators.push(Validators.maxLength(field.maxLength));
            const defaultValue = this.initialData ? this.initialData[field.name] : '';
            group[field.name] = [
                { value: defaultValue, disabled: field.disabled },
                validators
            ];
        });
        this.form = this.fb.group(group);
    }
    syncFormControls(fields) {
        if (!this.form)
            return;
        const existing = Object.keys(this.form.controls);
        const incoming = fields.map(f => f.name);
        existing.forEach(name => {
            if (!incoming.includes(name)) {
                this.form.removeControl(name);
            }
        });
    }
    listenToValueChange() {
        this.form.valueChanges.pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef)).subscribe(value => {
            console.log('Form State Stream:', value);
            this.runAiAgent(value);
        });
    }
    runAiAgent(value) {
        // Your AI processing layout hooks here...
    }
    handleAction(actionName) {
        if (!actionName)
            return;
        if (this.form.valid) {
            this.actionTriggered.emit({
                action: actionName,
                data: this.form.getRawValue()
            });
        }
        else {
            this.form.markAllAsTouched();
            this.cdr.markForCheck();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: DynamicFormComponent, deps: [{ token: i1.FormBuilder }, { token: i2.IconService }, { token: i0.ChangeDetectorRef }, { token: i0.DestroyRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.0", type: DynamicFormComponent, isStandalone: true, selector: "dynamic-form", inputs: { fields: "fields", buttonConfig: "buttonConfig", title: "title", type: "type", initialData: "initialData" }, outputs: { actionTriggered: "actionTriggered" }, usesOnChanges: true, ngImport: i0, template: "<form [formGroup]=\"form\" class=\"reactive-form\">\n  <h4>{{ title }}</h4>\n  <div class=\"form-container\" [class]=\"type || 'block'\">\n  @for(field of fields; track field.name){\n    <div class=\"form-field-group\">\n    <label [for]=\"field.name\">\n    @if (field.required) { \n        <small class=\"error-text\">*</small>\n            }\n          {{ field.label }}</label>\n                @if(field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number'){\n                <input [type]=\"field.type\" [placeholder]=\"field.placeholder\" [formControlName]=\"field.name\" class=\"form-control\"/>\n            } \n    @else if(field.type === 'textarea'){\n    <textarea [placeholder]=\"field.placeholder\" [formControlName]=\"field.name\" class=\"form-control\"></textarea>\n    } \n    @else if(field.type === 'select'){\n    <select [formControlName]=\"field.name\" class=\"form-control\">\n      @for(opt of field.options; track opt.value){\n      <option [value]=\"opt.value\">{{ opt.label }}</option>\n      }\n    </select>\n    } \n    @else if(field.type === 'checkbox'){\n    <input type=\"checkbox\" [formControlName]=\"field.name\" class=\"form-control\"/>\n    } \n    @else if(field.type === 'radio'){ @for(opt of field.options; track\n    opt.value){\n    <div class=\"form-check\">\n      <input\n        type=\"radio\"\n        [name]=\"field.name\"\n        [formControlName]=\"field.name\"\n        [value]=\"opt.value\"\n        class=\"form-check-input\"\n      />\n      <label class=\"form-check-label\">{{ opt.label }}</label>\n    </div>\n    }}\n    <div class=\"error-message\" *ngIf=\"form.get(field.name)?.touched && form.get(field.name)?.invalid\">\n      @if(form.get(field.name)?.errors?.['required']){\n      {{ field.label }} is required }\n      @if(form.get(field.name)?.errors?.['email']){ Please enter a valid email\n      address } @if(form.get(field.name)?.errors?.['minlength']){\n      {{ field.label }} must be at least\n      {{form.get(field.name)?.errors?.['minlength'].requiredLength}} characters\n      long } @if(form.get(field.name)?.errors?.['maxlength']){\n      {{ field.label }} cannot be more than\n      {{form.get(field.name)?.errors?.['maxlength'].requiredLength}} characters\n      long }\n    </div>\n  </div>\n  }\n  <div class=\"form-actions\">\n    @if(buttonConfig && !buttonConfig.dropdown) {  \n    <button \n      [type]=\"buttonConfig.type ||'submit'\" \n      [class]=\"buttonConfig.cssClass || 'btn btn-primary'\"\n      [disabled]=\"form.invalid\"\n      [class.btn-disabled]=\"form.invalid\"\n      (click)=\"handleAction(buttonConfig.action)\">\n      {{ buttonConfig.label }}\n      @if(buttonConfig.icon){\n      <mat-icon svgIcon=\"{{buttonConfig.icon}}\"></mat-icon>\n      {{buttonConfig.label}}\n      }\n    </button>\n}\n    @if (buttonConfig?.dropdown) {\n    <button \n      mat-raised-button \n      [matMenuTriggerFor]=\"menu\"\n      [className]=\"buttonConfig?.cssClass || 'btn btn-primary'\"\n      [disabled]=\"buttonConfig?.disabled || form.invalid\">\n      @if (buttonConfig?.icon) { \n        <mat-icon svgIcon=\"{{buttonConfig?.icon}}\"></mat-icon> }\n      {{ buttonConfig?.label }}\n      <mat-icon>arrow_drop_down</mat-icon>\n    </button>\n\n    <mat-menu #menu=\"matMenu\">\n      @for (item of buttonConfig?.dropdownItem; track item.label) {\n        <button mat-menu-item (click)=\"handleAction(item.action)\">\n          @if (item.icon) { <mat-icon>{{item.icon}}</mat-icon> }\n          <span>{{ item.label }}</span>\n        </button>\n      }\n    </mat-menu>\n  }\n  </div>\n  </div>\n</form>\n", styles: [".reactive-form .form-container{display:flex;flex-wrap:wrap;gap:20px}.reactive-form .form-container.inline{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}.reactive-form .form-container.block{display:flex;flex-direction:column}.reactive-form .form-container .form-actions{display:flex;align-items:end}.reactive-form .form-field-group{position:relative}.reactive-form .form-field-group .error-message{position:absolute;bottom:-15px;left:0;color:red;font-size:10px}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox]):not([ngNoCva])[formControlName],textarea:not([ngNoCva])[formControlName],input:not([type=checkbox]):not([ngNoCva])[formControl],textarea:not([ngNoCva])[formControl],input:not([type=checkbox]):not([ngNoCva])[ngModel],textarea:not([ngNoCva])[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox]:not([ngNoCva])[formControlName],input[type=checkbox]:not([ngNoCva])[formControl],input[type=checkbox]:not([ngNoCva])[ngModel]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple]):not([ngNoCva])[formControlName],select:not([multiple]):not([ngNoCva])[formControl],select:not([multiple]):not([ngNoCva])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.RadioControlValueAccessor, selector: "input[type=radio]:not([ngNoCva])[formControlName],input[type=radio]:not([ngNoCva])[formControl],input[type=radio]:not([ngNoCva])[ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i5.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i5.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i5.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.0", ngImport: i0, type: DynamicFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dynamic-form', standalone: true, imports: [ReactiveFormsModule, CommonModule, MatIconModule, MatMenuModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<form [formGroup]=\"form\" class=\"reactive-form\">\n  <h4>{{ title }}</h4>\n  <div class=\"form-container\" [class]=\"type || 'block'\">\n  @for(field of fields; track field.name){\n    <div class=\"form-field-group\">\n    <label [for]=\"field.name\">\n    @if (field.required) { \n        <small class=\"error-text\">*</small>\n            }\n          {{ field.label }}</label>\n                @if(field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number'){\n                <input [type]=\"field.type\" [placeholder]=\"field.placeholder\" [formControlName]=\"field.name\" class=\"form-control\"/>\n            } \n    @else if(field.type === 'textarea'){\n    <textarea [placeholder]=\"field.placeholder\" [formControlName]=\"field.name\" class=\"form-control\"></textarea>\n    } \n    @else if(field.type === 'select'){\n    <select [formControlName]=\"field.name\" class=\"form-control\">\n      @for(opt of field.options; track opt.value){\n      <option [value]=\"opt.value\">{{ opt.label }}</option>\n      }\n    </select>\n    } \n    @else if(field.type === 'checkbox'){\n    <input type=\"checkbox\" [formControlName]=\"field.name\" class=\"form-control\"/>\n    } \n    @else if(field.type === 'radio'){ @for(opt of field.options; track\n    opt.value){\n    <div class=\"form-check\">\n      <input\n        type=\"radio\"\n        [name]=\"field.name\"\n        [formControlName]=\"field.name\"\n        [value]=\"opt.value\"\n        class=\"form-check-input\"\n      />\n      <label class=\"form-check-label\">{{ opt.label }}</label>\n    </div>\n    }}\n    <div class=\"error-message\" *ngIf=\"form.get(field.name)?.touched && form.get(field.name)?.invalid\">\n      @if(form.get(field.name)?.errors?.['required']){\n      {{ field.label }} is required }\n      @if(form.get(field.name)?.errors?.['email']){ Please enter a valid email\n      address } @if(form.get(field.name)?.errors?.['minlength']){\n      {{ field.label }} must be at least\n      {{form.get(field.name)?.errors?.['minlength'].requiredLength}} characters\n      long } @if(form.get(field.name)?.errors?.['maxlength']){\n      {{ field.label }} cannot be more than\n      {{form.get(field.name)?.errors?.['maxlength'].requiredLength}} characters\n      long }\n    </div>\n  </div>\n  }\n  <div class=\"form-actions\">\n    @if(buttonConfig && !buttonConfig.dropdown) {  \n    <button \n      [type]=\"buttonConfig.type ||'submit'\" \n      [class]=\"buttonConfig.cssClass || 'btn btn-primary'\"\n      [disabled]=\"form.invalid\"\n      [class.btn-disabled]=\"form.invalid\"\n      (click)=\"handleAction(buttonConfig.action)\">\n      {{ buttonConfig.label }}\n      @if(buttonConfig.icon){\n      <mat-icon svgIcon=\"{{buttonConfig.icon}}\"></mat-icon>\n      {{buttonConfig.label}}\n      }\n    </button>\n}\n    @if (buttonConfig?.dropdown) {\n    <button \n      mat-raised-button \n      [matMenuTriggerFor]=\"menu\"\n      [className]=\"buttonConfig?.cssClass || 'btn btn-primary'\"\n      [disabled]=\"buttonConfig?.disabled || form.invalid\">\n      @if (buttonConfig?.icon) { \n        <mat-icon svgIcon=\"{{buttonConfig?.icon}}\"></mat-icon> }\n      {{ buttonConfig?.label }}\n      <mat-icon>arrow_drop_down</mat-icon>\n    </button>\n\n    <mat-menu #menu=\"matMenu\">\n      @for (item of buttonConfig?.dropdownItem; track item.label) {\n        <button mat-menu-item (click)=\"handleAction(item.action)\">\n          @if (item.icon) { <mat-icon>{{item.icon}}</mat-icon> }\n          <span>{{ item.label }}</span>\n        </button>\n      }\n    </mat-menu>\n  }\n  </div>\n  </div>\n</form>\n", styles: [".reactive-form .form-container{display:flex;flex-wrap:wrap;gap:20px}.reactive-form .form-container.inline{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr))}.reactive-form .form-container.block{display:flex;flex-direction:column}.reactive-form .form-container .form-actions{display:flex;align-items:end}.reactive-form .form-field-group{position:relative}.reactive-form .form-field-group .error-message{position:absolute;bottom:-15px;left:0;color:red;font-size:10px}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.IconService }, { type: i0.ChangeDetectorRef }, { type: i0.DestroyRef }], propDecorators: { fields: [{
                type: Input
            }], buttonConfig: [{
                type: Input
            }], title: [{
                type: Input
            }], type: [{
                type: Input
            }], initialData: [{
                type: Input
            }], actionTriggered: [{
                type: Output
            }] } });

/*
 * Public API Surface of krishito-ui-form
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DynamicFormComponent };
//# sourceMappingURL=takedemotest-krishito-ui-form.mjs.map
