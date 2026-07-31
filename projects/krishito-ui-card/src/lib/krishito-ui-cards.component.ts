import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, computed, ContentChild, contentChild, ElementRef, inject, input, Input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardConfig } from './krishito-ui-cards-model';
import { IconService } from '@takedemotest/krishito-ui-icons';

@Component({
  selector: 'cards',
  imports: [CommonModule,MatIconModule,NgTemplateOutlet],
  templateUrl: './krishito-ui-cards.component.html',
  styleUrl: './krishito-ui-cards.component.scss'
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
