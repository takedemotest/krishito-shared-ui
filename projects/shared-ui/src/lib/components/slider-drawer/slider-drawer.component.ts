import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";

export type DrawerPosition = 'left'|'right'|'top'|'bottom';

@Component({
    selector:'slider-drawer',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'slider-drawer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl:'slider-drawer.component.scss'
})

export class SliderDrawerComponent{ 
        @Input() position:DrawerPosition = 'left';
        @Input() isOpen:boolean = false;
        @Input() width:string = '250px';
        @Input() title:string = 'Drawer Title';

        @Output() isOpenChange = new EventEmitter<boolean>();
        @Output() closed = new EventEmitter<void>();

        toggleSliderDrawer(){
            this.isOpen = !this.isOpen;
            this.isOpenChange.emit(this.isOpen);
            if(!this.isOpen){
                this.closed.emit();
            }
        }
}