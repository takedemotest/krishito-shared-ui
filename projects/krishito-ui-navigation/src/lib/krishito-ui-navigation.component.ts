import { CommonModule } from "@angular/common";
import { Component, computed, inject, input} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { NavigationService } from "./krishito-ui-navigation.service";
import { MenuType, NavItem } from "./krishito-ui-navigation-model";

@Component({
    selector:'navigation-menu',
    standalone:true,
    imports: [CommonModule, MatIconModule,RouterModule],
    templateUrl:'krishito-ui-navigation.component.html',
    styleUrl:'krishito-ui-navigation.component.scss'
})

export class NavigationComponent{
    private navService = inject(NavigationService)

    public layoutKey = input.required<MenuType>();
    
    public menuData = computed(()=>{
        return this.navService.activeMenuLayout()[this.layoutKey()] || [];
    })

    onItemClick(item:NavItem):void{
        if(item.action){
            this.navService.emitAction(item);
        }
    }
}