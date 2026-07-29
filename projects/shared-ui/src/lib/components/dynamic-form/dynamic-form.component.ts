import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormButtonConfig, FormFieldConfig } from '../../models/form-field-model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AiAgentService } from './ai-agent.service';
import { debounceTime } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconService } from '../../../../../../src/app/core/services/icon.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'lib-dynamic-form',
  standalone: true, // Ensuring alignment with modern imports architecture
  imports: [ReactiveFormsModule, MatIconModule, MatMenuModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges { // Explicitly implement interfaces

  @Input() fields: FormFieldConfig[] = [];
  @Input() buttonConfig?: FormButtonConfig | undefined;
  @Input() title?: string;
  @Input() type?: string;
  @Input() initialData: any = null;
  @Output() actionTriggered = new EventEmitter<{ action: string, data: any }>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private aiService: AiAgentService,// future scope
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

  // 1. FIXED: Correct plural naming convention so Angular triggers the hook
  ngOnChanges(changes: SimpleChanges): void {
    
    // 2. FIXED: If fields change, ensure form exists before syncing controls
    if (changes['fields']) {
      if (!this.form) {
        this.createForm();
      } else {
        this.syncFormControls(this.fields);
      }
      this.cdr.markForCheck();
    }

    // 3. FIXED: Safe data patching with nullability checks
    if (changes['initialData'] && this.form) {
      if (this.initialData) {
        this.form.patchValue(this.initialData, { emitEvent: false }); // Prevent triggering AI side-effects on load
      } else {
        this.form.reset();
      }
      this.cdr.markForCheck(); // Alert OnPush tree to repaint inputs
    }
  }

  createForm() {
    const group: any = {};

    this.fields.forEach(field => {
      const validators = [];

      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
      
      // Look up if an initial data property matches this field control name on load
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

  // Consolidated your duplicate stream listeners into a single clean engine
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
    
    if (this.form.valid) { // FIXED: Validate form validity before firing execution triggers
      this.actionTriggered.emit({
        action: actionName, 
        data: this.form.getRawValue() // Professional tip: getRawValue() captures disabled inputs too!
      });
    } else {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
    }
  }
}