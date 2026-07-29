import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, ContentChild, contentChild, ElementRef, inject, input, Input, output, ChangeDetectionStrategy } from '@angular/core';
import { CardConfig } from '../../models/card-model';
import { IconService } from '../../../../../../src/app/core/services/icon.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cards',
  imports: [CommonModule,MatIconModule,NgTemplateOutlet],
  templateUrl: './cards.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
 public iconService = inject(IconService)
 
  public cardConfig = input.required<CardConfig[]>({ alias: 'config' });

  public type = input<'inline' | 'block'>();

  public cardTitle = input<string>('');

  public actions = output<{cardId: string, actionId: string}>();

  protected hasCustomHeader = false;
  
  private defaultSlotContent = contentChild<ElementRef>(ElementRef);

  public hasBodyContent = computed(() => {
    const element = this.defaultSlotContent();
    return !!element;
  })
  
 public config = computed(()=>{
  return this.cardConfig().map(item=>({
    ...item,
    randomBg: this.getRandomColour()
  }))
 })

 private getRandomColour(): string {  
  const hue = Math.floor(Math.random() * 360); 
  return `hsl(${hue}, 70%, 80%)`;
 }

  onClose(event: MouseEvent) {

  }
  public cardAction = output<{ cardId: string; actionId: string }>();
  onActionClick(event : MouseEvent, actionId: string){
    event.stopPropagation();
    this.actions.emit({cardId: this.config()[0].id, actionId: actionId});
  }
}
