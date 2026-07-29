import { computed, Injectable, signal } from "@angular/core";
import { MenuType, NavCategory, NavItem } from "../../models/navigation-model";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class NavigationService{

    private actionSubject = new Subject<NavItem>();
    public menuAction$ = this.actionSubject.asObservable();



    private registrySignal = signal<Record<MenuType, NavCategory[]>>({});
    private userRoleSignal = signal<string>('worker');

    public activeMenuLayout = computed(()=>{
        const role = this.userRoleSignal();
        const rawMenu = this.registrySignal();
        const filteredRegistry ={} as Record<MenuType, NavCategory[]>

        Object.keys(rawMenu).forEach((key)=>{
            filteredRegistry[key] = rawMenu[key]
            .map(category =>({
                ...category,
                items:category.items.filter(item=> !item.roleAllowed || item.roleAllowed.includes(role))
            })).filter(category => category.items.length > 0);
        });
        return filteredRegistry;
    });
  
    public registerMenu(type: MenuType, config:NavCategory[]):void{
        this.registrySignal.update(state =>({...state, [type]:config}));
    }
    public setUserRole(role:string):void{
        this.userRoleSignal.set(role);
    }
    public emitAction(item: NavItem):void{
        this.actionSubject.next(item);
    }
 
}

