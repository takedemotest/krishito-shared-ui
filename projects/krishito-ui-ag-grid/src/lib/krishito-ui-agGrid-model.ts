import { Observable } from "rxjs";
import { ColDef } from 'ag-grid-community';

export type columnType = 'text' | 'number' | 'date' | 'boolean' | 'custom' | 'currency' | 'percentage' | 'email' | 'url' | 'image' | 'icon' | 'button' | 'select' | 'multi-select' | 'radio' | 'checkbox' | 'color' | 'progress-bar' | 'rating' | 'tag' | 'badge' | 'avatar' | 'tooltip' | 'link'| 'actions' | 'nested' | 'tree' | 'group' | 'pivot' | 'sparkline' | 'heatmap' | 'calendar' | 'timeline' | 'gauge' | 'chart' | 'map' | 'custom-component'; 
export interface columnDefs extends ColDef{
    customMeta?: string;
    currencySymbol?: string;
    actions?:{name: string; label: string; btnClass?: string}[];
    badgeColorMap?: Record<string, { bg: string; text: string }>;
}

export interface gridConfig{
    gridId:string;
    title?:string;
    rowData?: any[];
    columns: columnDefs[];
    actionButtons?:headerAction[];
    pagination?: boolean;
    pageSize?: number;
    paginationPageSize?: number;
    rowSelection?: 'single' | 'multiple';
    defaultColDef?: any;
    enableExport?: boolean;
    enableSearch?: boolean;
}

export type DataFetcherFn <T = any>=()=>Observable<{success: boolean; data: T[]}>;

export interface headerAction {
    actionName:string;
    label?:string;
    icon:string;
    disable?:boolean
}

export interface GridActionPayload {
    actionName: string;
    rowData: any | null;
    selectedRows?: any[];
}