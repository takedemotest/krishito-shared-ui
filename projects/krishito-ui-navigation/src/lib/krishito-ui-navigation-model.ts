export type MenuType = string;
export interface NavItem{
    label:string;
    icon:string;
    route:string;
    action?:string;
    roleAllowed?:string[];
}

export interface NavCategory{
    categoryName?:string;
    items:NavItem[];
}