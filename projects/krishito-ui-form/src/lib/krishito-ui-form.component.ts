import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconService } from '@takedemotest/krishito-ui-icons';
import { FormButtonConfig, FormFieldConfig } from './krishito-ui-form-model';

@Component({
  selector: 'dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule, MatMenuModule],
  templateUrl: './krishito-ui-form.component.html',
  styleUrl: './krishito-ui-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges { 

  @Input() fields: FormFieldConfig[] = [];
  @Input() buttonConfig?: FormButtonConfig | undefined;
  @Input() title?: string;
  @Input() type?: string;
  @Input() initialData: any = null;
  @Output() actionTriggered = new EventEmitter<{ action: string, data: any }>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private iconService: IconService,  // future scope
    private cdr: ChangeDetectorRef, 
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    // If form wasn't built in ngOnChanges yet, build it now
    if (!this.form) {
      this.createForm();
    }
    this.listenToValueChange();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields']) {
      if (!this.form) {
        this.createForm();
      } else {
        this.syncFormControls(this.fields);
      }
      this.cdr.markForCheck();
    }
    if (changes['initialData'] && this.form) {
      if (this.initialData) {
        this.form.patchValue(this.initialData, { emitEvent: false }); 
      } else {
        this.form.reset();
      }
      this.cdr.markForCheck(); 
    }
  }

  createForm() {
    const group: any = {};

    this.fields.forEach(field => {
      const validators = [];

      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
      const defaultValue = this.initialData ? this.initialData[field.name] : '';

      group[field.name] = [
        { value: defaultValue, disabled: field.disabled },
        validators
      ];
    });

    this.form = this.fb.group(group);
  }

  syncFormControls(fields: FormFieldConfig[]) {
    if (!this.form) return;
    const existing = Object.keys(this.form.controls);
    const incoming = fields.map(f => f.name);

    existing.forEach(name => {
      if (!incoming.includes(name)) {
        this.form.removeControl(name);
      }
    });
  }
  private listenToValueChange() {
    this.form.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      console.log('Form State Stream:', value);
      this.runAiAgent(value);
    });
  }

  runAiAgent(value: any) {
    // Your AI processing layout hooks here...
  }

  handleAction(actionName: string | undefined) {
    if (!actionName) return;
    
    if (this.form.valid) {
      this.actionTriggered.emit({
        action: actionName, 
        data: this.form.getRawValue() 
      });
    } else {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
    }
  }
}