import { TemplateRef } from "@angular/core";

export interface CardFooterAction {
  id: string;
  label: string;
  action: string;
  icon?: string;
  type?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}
export interface CardConfig{
    id: string;
    showHeader:boolean;
    headerTitle?:string;
    showCloseButton?:boolean;
    isClickable?:boolean;
    title?:string;
    subtitle?:string;
    matric?:string;
    progress?:number;
    hasBodyContent?:TemplateRef<any>;
    body?:string;
    showFooter?:boolean;
    footerActions?:CardFooterAction[];
    icon?:string;
    cssClass?:string;
}